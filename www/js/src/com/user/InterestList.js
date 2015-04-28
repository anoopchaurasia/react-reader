fm.Package("com.user");
fm.Import("com.user.Interest");
fm.Class("InterestList>jsfm.AbstractList", function (me, Interest) {this.setMe = function(_me){me=_me};

	this.InterestList = function (){
		me.base(Interest);
		me.set({
			name: "anoop",
			id: 1
		});
	};
});