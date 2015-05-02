fm.Package("com.reader");
fm.Include("lib.pageslider");
fm.Include("lib.router");
fm.Class("Router", function (me) { this.setMe = function(_me){me=_me};
	'use strict';
	var starter;

	this.Router = function (st) {
		starter = st;
	};

	function loadPage (klass, cb) {
		if(!starter.isLoggedIn() && klass !== "com.reader.page.FirstPage") {
			starter.load("login");
			return;
		}
		fm.Include(klass, function () {
			var instance = new (fm.isExist(klass))(starter);
			destroy(instance);
			instance.render(function (element){
				starter.slider.slidePage(element);
			});
		});
	}

	function render (instance){
		destroy(instance);
		instance.render(function (element){
			starter.slider.slidePage(element);
		});
	}

	this.initialize = function(router, defaultPath) {
		router.addRoute('/contents/:id', function(id) {
			fm.Include("com.reader.page.Content", function () {
				var instance = new com.reader.page.Content(id, starter);
				render(instance);
			});
		});
		router.addRoute('/login', function(path) {
			if(starter.isLoggedIn()){
				starter.load('contents');
				return;
			}
			loadPage('com.reader.page.FirstPage', function(){});
		});
		router.addRoute('/contents', function(path) {
			loadPage('com.reader.page.Contents', function(){});
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