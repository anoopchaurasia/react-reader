fm.Package("com.feedly");
fm.Import("jsfm.Utility");
fm.Import("jsfm.Server");
fm.Class("Services", function (me, Utility, Server) { this.setMe=function(_me) {me=_me};

	this.Services = function (){
		this.baseurl = "http://sandbox.feedly.com/v3/";
		this.client_id = "sandbox";
		this.grant_type = "authorization_code";
		this.redirect_uri = "http://localhost:8080";
		this.client_secret = "4205DQXBAP99S8SUHXI3";
		this.code= "AhaMVu97ImkiOiI4YjdmZjE2MC03MTQxLTRlYTUtYjM0NC1jYWMwYmI3Nzk0OWUiLCJ1IjoiMTA5MzQ3NDMxMDUxNzYzMTE5MzE4IiwiYSI6IkZlZWRseSBzYW5kYm94IGNsaWVudCIsInAiOjYsInQiOjE0MzAyMzQ1MzU3NDd9";
	};

	this.getCode = function (cb){
		var url = Server.getGetUrl({
			client_id: this.client_id,
			client_secret: this.client_secret,
			response_type: "code",
			scope:"https://cloud.feedly.com/subscriptions",
			grant_type: this.grant_type,
			redirect_uri: this.redirect_uri
		}, me.baseurl + "auth/auth");
		var w= window.open(url);
		w.onload = function (){
			debugger;
		};
	};

	this.getTokenFromCode = function (cb){
		Server.post({
			client_id: this.client_id,
			client_secret: this.client_secret,
			"code": this.code,
			grant_type: this.grant_type,
			redirect_uri: this.redirect_uri
		}, me.baseurl + "auth/token",
		function(data){
			localStorage.access_token = data.access_token;
			localStorage.refresh_token= data.refresh_token;
			localStorage.expires_in = data.expires_in;
			localStorage.user_id = data.id;
			localStorage.token_renewal_time = new Date().toString();
			$.ajaxSetup({
		    	headers: {
		    		'Authorization': localStorage.access_token
		    	}
			});
			cb && cb();
		});
	};

	function isLoggedIn (cb){
		if(!localStorage.access_token) {
			me.getTokenFromCode(cb);
			return  false;
		}

		if(Utility.getTimeDiffInSeconds(new Date(localStorage.token_renewal_time), new Date()) > localStorage.expires_in) {
			me.getTokenFromToken(cb);
			return  false;
		}
		return true;
	}

	this.getFeeds = function (cb) {
		if(!isLoggedIn(function(){
			me.getFeeds(cb);
		})) {
			return;
		}
		Server.get({streamId: "user/"+localStorage.user_id+"/category/global.all"}, me.baseurl + "streams/contents", function (data) {

		});
	};

	this.getTokenFromToken = function (cb) {
		Server.post({
			refresh_token: localStorage.refresh_token,
			client_id: this.client_id,
			client_secret: this.client_secret,
			grant_type: 'refresh_token'
		}, me.baseurl + "auth/token", function (data){
			localStorage.access_token = data.access_token;
			localStorage.expires_in = data.expires_in;
			localStorage.user_id = data.id;
			localStorage.token_renewal_time = new Date().toString();
			$.ajaxSetup({
		    	headers: {
		    		'Authorization': localStorage.access_token
		    	}
			});
		});
	};
});