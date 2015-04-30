fm.Package("com.reader.page");
fm.Import("com.user.InterestList");
fm.Include("react.contentList");
fm.Class("Contents>jsfm.Page", function(me, InterestList){ this.setMe = function(_me){me=_me};

    var starter;
	this.Contents = function (st) {
        starter = st;
        me.react = null;
        me.starter = starter;
	};

	this.render = function (cb) {
        var div = document.createElement('div');
		me.react = React.render(
            React.createElement(ContentListClass.root, me),
            div
        );
        $.get("html/temp.html", function(data){
            starter.contentList.set({
                title:"Gandhi",
                content:{content: data},
                author:"Anoop",
                id:1
            });
            me.react.setState({content: starter.contentList});
        });
        // starter.services.getFeeds(function (data){
        //     starter.contentList.multiSet(data.items);
        // });
        cb && cb($(div));
	};
});