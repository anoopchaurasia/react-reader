fm.Package("com.feedly");
fm.Import("jsfm.Utility");
fm.Import("jsfm.Server");
fm.Import("com.feedly.ContentList");
fm.Class("Services", function (me, Utility, Server, ContentList) { this.setMe=function(_me) {me=_me};

	this.init = function (){
		Static.baseurl = "http://sandbox.feedly.com/v3/";
		Static.client_id = "sandbox";
		Static.redirect_uri = "http://localhost:8080";
		Static.scope = "https://cloud.feedly.com/subscriptions";
		Static.client_secret = "4205DQXBAP99S8SUHXI3";
	};

	Static.getLoginJson = function (){
		return {
			client_id: this.client_id,
			client_secret: this.client_secret,
			response_type: "code",
			auth_url: this.baseurl + "auth/auth",
			redirect_uri: this.redirect_uri,
			other_params: {
				scope: this.scope,
				state: 23453423554234,
				grant_type: "authorization_code"
			}
		};
	};
	this.Services = function (){
	};

	this.getTokenFromCode = function (token, cb){
		Server.post({
			client_id: this.client_id,
			client_secret: this.client_secret,
			"code": token,
			grant_type: "authorization_code",
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
		}, function(e){
		});
	};

	function isLoggedIn (cb){
		if(!localStorage.access_token) {
			me.getTokenFromCode(null, cb);
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
		Server.get({count: 10,streamId: "user/"+localStorage.user_id+"/category/global.all"}, me.baseurl + "streams/contents", function (data) {
			cb(data);
		}, function(resp){
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