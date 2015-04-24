fm.Package("com.reader.view");
fm.Class("Article> jsfm.Page", function (base, me, ArticleController, SettingsController, View){this.setMe=function(_me){me=_me;};
	this.setMe=function(_me){me=_me};
	this.Article = function(){
        this.url = 'html/article.view.html';
		this.items = [
            {
                controller: ArticleController,
                template: 'html/article.html',
                container : '#articleContContainer'
            },
            {
                controller: com.reader.setting.SettingsController,
                template: "/html/taskmanager.html",
                container: "#taskmanager"
            }
        ];
	};
});