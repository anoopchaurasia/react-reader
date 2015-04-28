fm.Package("com.reader");
fm.Include("lib.pageslider");
fm.Include("lib.router");
fm.Class("Router", function (me) { this.setMe = function(_me){me=_me};
	'use strict';
	var starter;

	this.Router = function (st) {
		starter = st;
	};

	function loadPage (klass, cb){
		fm.Include(klass, function () {
			var instance = new (fm.isExist(klass))(starter);
			destroy(instance);
			instance.render(function (element){
				starter.slider.slidePage(element);
			});
		});
	}

	this.initialize = function(router, defaultPath) {
		router.addRoute('/interests', function(path) {
			loadPage('com.reader.page.SelectInterest', function(){});
		});
		router.start();
		router.load("#/"+defaultPath);
		document.addEventListener("backbutton", Starter.onBackButton, false);
	};

	function destroy (currentPage) {
		if (starter.currentPage) {
			starter.currentPage.destroy();
		}
		starter.currentPage = currentPage;
	}

});