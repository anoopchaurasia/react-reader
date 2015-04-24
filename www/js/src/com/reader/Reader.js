fm.Package("com.reader");
fm.Import("com.reader.store.FeedList");
fm.Import("com.reader.setting.Settings");
fm.Include("jsfm.Utility");
fm.Include("lib.react");
fm.Include("lib.fastclick");
fm.Include("lib.router");
fm.Class("Reader", function (me, FeedList, Settings){this.setMe=function(_me){me=_me;};
    'use strict';
    this.setMe = function (_me) { me = _me };
    Static.main = function () {
	};
});
