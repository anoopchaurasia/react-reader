fm.Package("com.reader.page");
fm.Import("com.user.InterestList");
fm.Include("react.interestList");
fm.Class("SelectInterest>jsfm.Page", function(me, InterestList){ this.setMe = function(_me){me=_me};

    var starter;
	this.SelectInterest = function (st) {
        starter = st;
		me.interests = new InterestList();
	};

	this.render = function (cb) {
		me.react = React.render(
            React.createElement(InteresetClass.interest, me),
            document.body
        );
        starter.services.getFeeds(function (){
            debugger;
        });
        cb && cb($(document.body.childNodes[0]));
	};
});