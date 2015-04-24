fm.Package("jsfm");
fm.AbstractClass("Page", function (me) {
	this.setMe = function (_me) {
		me = _me;
	};

	this.Page = function () {
		this.destroyed = false;
	};

	this.render = function (data, cb, keys, isOverlay){
		if(me.destroyed) return;
		var newcb = function(html) {
			cb && cb.apply(this, arguments);
			if(isOverlay) {
				html.appendTo('body')
				.on('click', '.cancel', me.remove)
		        .on('click', '.save', function () {
		        	me.getSub().save(html);
		        });
		        me.getSub().afterRender(html);
		        var slideFrom = me.getSub().slide_from || "top";
		        slider.slidePageFrom(html, slideFrom, true);
			}
		};
		data = data || me.getSub();
    	me.compile(keys, function (template) {
            newcb($(template(data)));
    	});
	};

	this.compile = function (keys, cb){
		var sub = me.getSub();
		me.preCompile(sub, keys, cb);
	};

	this.remove = function (html){
		if(me.destroyed) {
			return;
		}
		$(html).off();
		var slideFrom = me.getSub().slide_from == "bottom" ? "top" : "bottom";
		slider.slidePageFrom($('body >div.page:first'), slideFrom, undefined, true);
		me.destroy();
	};

	this.destroy = function () {
		document.body.scrollTop = 0;
		if(!this.destroyed) {
			var sub = me.getSub();
			if(sub.onBackButton) {
				Starter.releaseLast(sub.onBackButton);
			}
		}
		this.destroyed = true;

		var sub = me.getSub();
		if(sub.onDestroy) {
			sub.onDestroy();
		}
	};

	Static.preReady = function (klass){
		fm.Include(klass);
	};

	Static.preCompile = function (klass, keys, cb){
		keys = keys || [];
		var template_key = keys[0] || "template";
        cb && cb(klass[template_key]);
	};
});