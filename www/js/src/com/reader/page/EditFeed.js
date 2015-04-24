fm.Package("com.reader.view");
fm.Class("EditFeed> jsfm.Page", function (base, me, EditNewsFeed, View){this.setMe=function(_me){me=_me;};
    this.setMe=function(_me){me=_me};
    this.EditFeed = function(){
        this.url = 'html/editfeed.view.html';
        this.items = [
            {
                controller: EditNewsFeed,
                template: 'html/addfeeds.html',
                container : '#editfeed'
            }
        ];
    };

    this.onChange = function(keyValue, oldKeyValue){
        this.reRender(ArticleListController, keyValue);
    };
});