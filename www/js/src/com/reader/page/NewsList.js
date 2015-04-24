fm.Package("com.reader.view");
fm.Class("NewsList> jsfm.Page", function (me, ArticleListController, View){this.setMe=function(_me){me=_me;};
	this.NewsList = function(){
		this.url = 'html/newslist.view.html';
		this.items = [
            {
                controller: ArticleListController,
                template: 'html/articles.html',
                container : '#dynamic'
            }
        ];
	};

	this.onChange = function(keyValue, oldKeyValue){
		this.reRender(ArticleListController, keyValue);
	};
});