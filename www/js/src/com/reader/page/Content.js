fm.Package("com.reader.page");
fm.Include("react.content");
fm.Import("com.fill.FillContent");
fm.Class("Content>jsfm.Page", function(me, FillContent){ this.setMe = function(_me){me=_me};

	this.Content = function (id, starter){
		this.content = starter.contentList.getById(id);
	};

	this.render = function (cb){
		var div = document.createElement('div');
		me.react = React.render(
            React.createElement(ContentClass.root, me),
            div
        );
        cb && cb($(div));
        create(me.content.content||me.content.summary, {height:0, width:0});
	};

	function getWidth(fs) {
        var w = jQuery(window).width(), cw = fs * multi;
        return Math.min(w - 40, cw);
    }

    var multi = 18, setTimeOut;

	function create(data, image) {
		data = me.stripHTML(data);
        var articleContainer = $("#articleContainer").empty();
        var articalWidth = getWidth(20), margins = 0;
        articleContainer.parent().css('fontSize', 20);
        var trancatedLength = [0, 1];
        var htm = "<div class='parent selector'><div class='s'></div></div>";
        clearTimeout(setTimeOut);
        var bodyHeight = window.innerHeight - articleContainer.offset().top - 10;
        var content = new FillContent();
        var i = 0;
        var removeHeight = margins + 30;
		//data = "<h1 class='title'>" + me.article.title + "</h1>" + data;
        if(false){
            i = 1;
            var elem = $(htm).appendTo(articleContainer);
            elem.find("div.s").height(bodyHeight - removeHeight - 10).width(articalWidth);
            elem.find("div.s").html('<img style="max-width:100%;max-height:100%" src="'+image.url+'">');
            var imageHeight = Math.min(image.height, (articalWidth/image.width)*image.height);
			elem.find("div.s").append("<div class='inImage' style='height:"+ (bodyHeight - removeHeight - 10 - imageHeight ) + "px; width:100%'></div>");
			trancatedLength = content.truncateWithHeight(elem.find("div.inImage"), trancatedLength[0], data);
		}
        function recursive(trancatedLength) {
            if (trancatedLength[1] <= 0) {
               // renderComplete(1, i);
                articleContainer.append('<br style="clear:both" />');
                return;
            }
            i++;
            var elem;
            articleContainer.width((i) * (articalWidth + 40));
            elem = $(htm).appendTo(articleContainer);
            elem.find("div.s").height(bodyHeight - removeHeight - 10).width(articalWidth);
            content.truncateWithHeight(elem.find("div.s"), trancatedLength[0], data, recursive);
        }
        recursive(trancatedLength);
    }

     var myRegEx = /<\/?[^<>]*\/?>/gim;
	Static.stripHTML = function (htmlStr) {
		var html = $("<div>"+htmlStr+"</div>");
		var imageList = [];
		var temp;
		html
		 .find("img").filter(function( ) {
		 	var outerHTML = this.outerHTML;
				temp = {

					height: outerHTML.match(/(height=.)([\d]*)/) && outerHTML.match(/(height=.)([\d]*)/)[2] || this.style.height,
					width: outerHTML.match(/(width=.)([\d]*)/) && outerHTML.match(/(width=.)([\d]*)/)[2] || this.style.width
				};

				if(temp.height > 100 && temp.width > 100)
				{
				   $(this).replaceWith("<div style='width:100px; height:100px;' class='ImageShow'><img class='a' style='max-width:100%;max-height:100%;' src='"+this.src+"' /></div>").after("<div style='clear:left'>&nbsp;</div>");
				   return false;

				}
				return true;

		}).remove();
		html.find("iframe").remove();
		var counter = 0;
		return html.html().replace(/>|</gim, function(a){ return a=='>'?"> ": " <"})
		.replace(/\sstyle=""/gim, " ").replace( /(\s*)<\/?[^<>]*\/?>|(\s*)(.*?)\s/gim,function(a, b){
			if(a.match(/<\/?[^<>]*\/?>/gim)) return a;
			return "<span id='word-"+ counter++ +"' class='a'>"+ a+" </span>";
		});
	};

});