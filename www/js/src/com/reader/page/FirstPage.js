fm.Package("com.reader.page");
fm.Import('com.feedly.Services');
fm.Include('lib.jquery-oauth2');
fm.Include("react.first-page");
fm.Class("FirstPage>jsfm.Page", function (me, Services) {
    'use strict';
    this.setMe = function(_me){me=_me};

    var starter;
	this.FirstPage = function (st){
        this.react = null;
        starter = st;
	};

	this.render = function (cb){
        var div = document.createElement('div');
        me.react = React.render(
            React.createElement(LoginClass.root, me),
            div
        );
        cb && cb($(div));
	};

    this.onToken = function (){
        starter.load('contents');
    };

	Static.onBackButton = function (cb){
		//navigator.app.exitApp();
	};

    this.signup = function(provider) {
        var options = Services.getLoginJson();
        $.oauth2(options, function(token, response) {
            starter.services.getTokenFromCode(token, me.onToken);
        }, function(error, response){
            alert("Failed to connect, Please try again!!");
        });
    };
});
