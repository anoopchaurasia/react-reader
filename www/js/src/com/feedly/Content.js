fm.Package("com.feedly");
fm.Class("Content", function (me, Utility, Server) { this.setMe=function(_me) {me=_me};

	this.Content = function (c){
		this.title = c.title;
		this.content = c.content? c.content.content : null;
		this.summary = c.summary? c.summary.content: null;
		this.author = c.author;
		this.id = encodeURIComponent(c.id);
	};
});