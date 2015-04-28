fm.Package("com.reader.page");
fm.Import("com.user.InterestList");
fm.Include("react.interestList");
fm.Class("Contents>jsfm.Page", function(me, InterestList){ this.setMe = function(_me){me=_me};

    var starter;
	this.Contents = function (st) {
        starter = st;
        me.react = null;
		me.contentList = {items: []};
	};

	this.render = function (cb) {
		me.react = React.render(
            React.createElement(InteresetClass.interest, me),
            document.body
        );
        starter.services.getFeeds(function (list){
            me.contentList = list;
            me.react.setProps(me);
        });
        cb && cb($(document.body.childNodes[0]));
	};
});