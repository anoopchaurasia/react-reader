fm.Package('');
fm.Import("jsfm.Server");
fm.Import("com.feedly.Services");
fm.Import("com.reader.Router");
fm.Class("Starter", function (me, Server, Services, Router) {
	'use strict';

	this.setMe = function (_me){
		me = _me;
	};
	Static.main = function (){
		new me();
	};

	var singleton;
	Static.getInstance = function (instance) {
		if(instance){
			singleton = instance;
		}
		return singleton;
	};

	Static.load = function (path) {
		router.load("#/"+path);
	};

	this.Starter = function (){

		Starter.getInstance(me);
		if(!window.localStorage){
			window.localStorage = {};
		}
		Server.setHttp(jQuery.ajax);

		if(!localStorage.access_token){
			Services.getTokenFromCode();
		}
		$.ajaxSetup({
	    	headers: {
	    		'Authorization': localStorage.access_token
	    	}
		});
		me.currentPage = null;
		me.slider = new PageSlider($('body'));
		new Router(me).initialize(router, location.hash.substring(2) ||'newslist');
	};

	var backList = [];
	Static.onBackButton = function (cb){
		if( typeof cb === 'function') {
			backList.push(cb);
		} else if (backList.length) {
			backList[backList.length -1]();
		}
	};

	Static.releaseLast = function  (cb) {
		var index = backList.indexOf(cb);
		backList.splice(index, 1);
	};
});
