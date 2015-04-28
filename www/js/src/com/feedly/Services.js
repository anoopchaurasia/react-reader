fm.Package("com.feedly");
fm.Import("jsfm.Server");
fm.Class("Services", function (me, Server) { this.setMe=function(_me) {me=_me};

	this.Services = function (){
		this.baseurl = "http://sandbox.feedly.com/v3/";
		this.client_id = "sandbox";
		this.grant_type = "authorization_code";
		this.refresh_token = localStorage.refresh_token;
		this.redirect_uri = "http://localhost:8080";
		this.client_secret = "4205DQXBAP99S8SUHXI3";
		this.code= "ApVWdAx7ImkiOiI4YjdmZjE2MC03MTQxLTRlYTUtYjM0NC1jYWMwYmI3Nzk0OWUiLCJ1IjoiMTA5MzQ3NDMxMDUxNzYzMTE5MzE4IiwiYSI6IkZlZWRseSBzYW5kYm94IGNsaWVudCIsInAiOjYsInQiOjE0Mjk5OTA5MzIwODF9";
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
			localStorage.token_renewal_time = new Date().toString();
			cb && cb();
		});
	};

	this.getTokenFromToken = function (cb) {
		Server.post({
			refresh_token: this.refresh_token,
			client_id: this.client_id,
			client_secret: this.client_secret,
			grant_type: this.grant_type
		}, me.baseurl + "auth/token", function (data){
			localStorage.access_token = data.access_token;
			localStorage.expires_in = data.expires_in;
			localStorage.token_renewal_time = new Date().toString();
		});
	};
});