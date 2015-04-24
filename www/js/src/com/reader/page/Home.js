fm.Package("com.reader.view");
fm.Class("Home> jsfm.Page",function (base, me, SourceController, View){this.setMe=function(_me){me=_me;};
	this.setMe=function(_me){me=_me};
	this.Home = function(){
		this.url = 'html/home.view.html';
		this.items = [
            {
                controller: SourceController,
                template: 'html/sources.html',
                container : '#sourceList'
            }
        ];
	};
});