fm.Package("com.feedly");
fm.Import("com.feedly.Content");
fm.Class("ContentList>jsfm.AbstractList", function (me, Content) { this.setMe=function(_me) {me=_me};

	this.ContentList = function (list) {
		this.base(Content);
		this.multiSet(list);
	};
});