fm.Package("com.fill");
fm.Class("FillContent");
com.fill.FillContent = function (me) {
	'use strict';
	this.setMe = function( _me ) {
		me = _me;
	};
	$.fn.SkipRoot = function( skipAfterA ) {
		var aFound = false;
		this.find("*").not(".a").filter(function( ) {
			if($(this).find(".a").length ) return false;
			if($(this).find('img').length) return false;
			var tag = this.tagName.toLowerCase();
			return tag != 'br' && tag != 'img' && $.trim($(this).text()) == '';
		}).remove();
	};

	function createElem (obj) {
		var elem = document.createElement(obj.tag);
		elem.attributes = obj.attributes;
		if(obj.content) {
			elem.innerHTML = obj.content;
		}
		return elem;
	};

	function addElem (dom, obj, limit, arr){
		var elem = createElem(obj);
 		dom.appendChild(elem);
 		var e = $(elem);
 		if(e.height() + e.offset().top > limit) {
 			e.detach();
 			return [];
 		}
 		var t;
 		for (var i = (arr.pop()||0); i < obj.childs.length; i++) {
 			t = addElem(elem, obj.childs[i], limit, arr);
 			if(t) {
 				t.push(i);
 				return t;
 			}
 		};

	}
	this.truncateWithHeight = function(dom, obj, cb, arr) {
 		var limit = dom.height() + dom.offset().top - 48;
 		setTimeout(function(){
	 		var t = addElem(dom[0], obj, limit, arr);
	 		cb(t);
 		}, 100);
	};
	this.FillContent = function( ) {

	};
};
