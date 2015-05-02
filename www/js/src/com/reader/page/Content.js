
var data;
$.get('html/temp.html', function(d){
    data = d;
});
fm.Package("com.reader.page");
fm.Include("react.content");
fm.Import("com.fill.FillContent");
fm.Class("Content>jsfm.Page", function(me, FillContent){ this.setMe = function(_me){me=_me};

	this.Content = function (id, starter){
		this.content = {
            content: data
        };
	};

	this.render = function (cb){
		var div = document.createElement('div');
		me.react = React.render(
            React.createElement(ContentClass.root, me),
            div
        );
        cb && cb($(div));
        create(me.content.content||me.content.summary, {height:0, width:0});
        $(document).off('horizontal-scroll').on('horizontal-scroll', me.swipe);
        //$(document).off('keyup').on('keyup', me.swipeKeyPress);
	};

    this.swipeKeyPress = function (){
       // switch();
    }

    this.swipe = function (e, start, end, diff){
        if(diff > 0) {
            me.goToPrevPage();
        } else {
            me.goToNextPage();
        }
    };

    this.goToNextPage = function (){
        setTransformValue ("-");
    };

    function setTransformValue (operator) {
         var w=$(window).width();
        var articleContainer = $("#articleContainer");
        oldStyle = articleContainer[0].style.transform.match(/((-|)\d+)/g);
        if(oldStyle) {
            oldStyle = oldStyle[1]*1;
        }else {
            oldStyle = 0;
        }
        var newValue;
        switch(operator) {
            case "+" :{
                newValue = oldStyle + w;
                break;
            }
            case "-" : {
                newValue = oldStyle - w;
                break;
            }
        }
        articleContainer.css({
            "-webkit-transform": "translate3d("+newValue+"px, 0, 0)",
            "transform": "translate3d("+newValue+"px, 0, 0)"
        });
    }

     this.goToPrevPage = function (){
       setTransformValue ("+");
    };


	function getWidth(fs) {
        var w = jQuery(window).width(), cw = fs * multi;
        return Math.min(w - 40, cw);
    }

    var multi = 18, setTimeOut;

	function create(data, image) {
		data = me.stripHTML(data);
        var articleContainer = $("#articleContainer").empty();
        var articalWidth = getWidth(20), margins = 0;
        articleContainer.parent().css('fontSize', 20);
        var trancatedLength = [0, 1];
        var htm = "<div class='parent selector'><div class='s'></div></div>";
        clearTimeout(setTimeOut);
        var bodyHeight = window.innerHeight - articleContainer.offset().top - 10;
        var content = new FillContent();
        var i = 0;
        var removeHeight = margins + 30;
        function recursive(trancatedLength) {
            i++;
            if(!trancatedLength) {
                return;
            }
            var elem;
            articleContainer.width((i+1) * (articalWidth + 40));
            elem = $(htm).appendTo(articleContainer);
            elem.find("div.s").height(bodyHeight - removeHeight - 10).width(articalWidth);
            content.truncateWithHeight(elem.find("div.s"), data, recursive, trancatedLength);
        }
        recursive([]);
    }

     var myRegEx = /<\/?[^<>]*\/?>/gim;
	Static.stripHTML = function (htmlStr) {
        htmlStr = htmlStr.replace(/>|</gim, function(a){ return a=='>'?"> ": " <"})
        .replace(/\sstyle=""/gim, " ").replace( /(\s*)<\/?[^<>]*\/?>|(\s*)(.*?)\s/gim,function(a, b){
            if(a.match(/<\/?[^<>]*\/?>/gim)) return a;
            return "<span class='a'>"+ a+" </span>";
        });
		var html = $("<div>"+htmlStr+"</div>");
        html.find("iframe").remove();
		var temp;
		html
		 .find("img").filter(function( ) {
		 	var outerHTML = this.outerHTML;
				temp = {

					height: outerHTML.match(/(height=.)([\d]*)/) && outerHTML.match(/(height=.)([\d]*)/)[2] || this.style.height,
					width: outerHTML.match(/(width=.)([\d]*)/) && outerHTML.match(/(width=.)([\d]*)/)[2] || this.style.width
				};

				if(temp.height > 100 && temp.width > 100)
				{
				   $(this).replaceWith("<div style='width:100px; height:100px;' class='ImageShow'><img class='a' style='max-width:100%;max-height:100%;' src='"+this.src+"' /></div>").after("<div style='clear:left'>&nbsp;</div>");
				   return false;

				}
				return true;

		}).remove();
		return createTags(html[0], {});
	};
    function createTags(elem, storage) {
        storage.attributes = elem.attributes;
        storage.tag = elem.tagName;
        storage.childs = [];
        if(elem.className == "a") {
            storage.content = elem.innerHTML;
            return storage;
        }
        for (var i = 0; i < elem.childNodes.length; i++) {
            t= elem.childNodes[i];
            if( !(t.nodeName == "#text" && t.nodeValue.trim() == "")) {
                storage.childs.push(createTags(t, {}));
            }
        };
        return storage;
    }

});