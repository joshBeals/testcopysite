!function(b){b.jscroll={defaults:{debug:!1,autoTrigger:!0,autoTriggerUntil:!1,loadingHtml:"<small>Loading...</small>",padding:0,nextSelector:"a:last",contentSelector:"",pagingSelector:"",callback:!1,refresh:!1}};var r=function(a,e){var t=a.data("jscroll"),n="function"==typeof e?{callback:e}:e,s=b.extend({},b.jscroll.defaults,n,t||{}),d="visible"===a.css("overflow-y"),r=a.find(s.nextSelector).first(),l=b(window),o=b("body"),f=d?l:a,i=b.trim(r.attr("href")+" "+s.contentSelector);if("undefined"==i)return v("warn","jScroll: nextSelector not found - destroying"),g(),!1;function u(){a.find(".jscroll-inner").length||a.contents().wrapAll('<div class="jscroll-inner" />')}function c(e){s.pagingSelector?e.closest(s.pagingSelector).hide():e.parent().not(".jscroll-inner,.jscroll-added").addClass("jscroll-next-parent").hide().length||e.wrap('<div class="jscroll-next-parent" />').parent().hide()}function g(){return f.unbind(".jscroll").removeData("jscroll").find(".jscroll-inner").children().unwrap().filter(".jscroll-added").children().unwrap()}function p(){u();var e=a.find("div.jscroll-inner").first(),t=a.data("jscroll"),n=parseInt(a.css("borderTopWidth")),r=isNaN(n)?0:n,l=parseInt(a.css("paddingTop"))+r,o=d?f.scrollTop():a.offset().top,i=e.length?e.offset().top:0,c=Math.ceil(o-i+f.height()+l);if(!t.waiting&&c+s.padding>=e.outerHeight())return v("info","jScroll:",e.outerHeight()-c,"from bottom. Loading next request..."),h()}function j(){var e=a.find(s.nextSelector).first();s.autoTrigger&&(!1===s.autoTriggerUntil||0<s.autoTriggerUntil)?(c(e),o.height()<=l.height()&&p(),f.unbind(".jscroll").bind("scroll.jscroll",function(){return p()}),0<s.autoTriggerUntil&&s.autoTriggerUntil--):(f.unbind(".jscroll"),e.bind("click.jscroll",function(){return c(e),h(),!1}))}function h(){var e=a.find("div.jscroll-inner").first(),o=a.data("jscroll");return o.waiting=!0,e.append('<div class="jscroll-added" />').children(".jscroll-added").last().html('<div class="jscroll-loading">'+s.loadingHtml+"</div>"),a.animate({scrollTop:e.outerHeight()},0,function(){e.find("div.jscroll-added").last().load(o.nextHref,function(e,t,n){if("error"===t)return g();var r,l=b(this).find(s.nextSelector).first();o.waiting=!1,o.nextHref=!!l.attr("href")&&b.trim(l.attr("href")+" "+s.contentSelector),b(".jscroll-next-parent",a).remove(),(r=r||a.data("jscroll"))&&r.nextHref?j():(v("warn","jScroll: nextSelector not found - destroying"),g()),s.callback&&s.callback.call(this),v("dir",o)})})}function v(e){if(s.debug&&"object"==typeof console&&("object"==typeof e||"function"==typeof console[e]))if("object"==typeof e){var t=[];for(var n in e)"function"==typeof console[n]?(t=e[n].length?e[n]:[e[n]],console[n].apply(console,t)):console.log.apply(console,t)}else console[e].apply(console,Array.prototype.slice.call(arguments,1))}return a.data("jscroll",b.extend({},t,{initialized:!0,waiting:!1,nextHref:i,refresh:s.refresh})),u(),function(){var e=b(s.loadingHtml).filter("img").attr("src");if(e){var t=new Image;t.src=e}}(),j(),b.extend(a.jscroll,{destroy:g}),a};b.fn.jscroll=function(n){return this.each(function(){var e=b(this),t=e.data("jscroll");if(!t||!t.initialized||!1!==t.refresh)new r(e,n)})}}(jQuery);