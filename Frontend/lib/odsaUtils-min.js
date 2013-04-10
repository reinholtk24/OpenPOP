"use strict";(function(f){var q;var u;var b=+new Date();if(!(window.console&&console.log)){console={log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){}}}function l(z){z=(z)?z:document;if(f("div > a#login-link",z).length===1&&f("div > a#login-link",z).parent().hasClass("header")){return true}return false}function i(A){A=(A)?A:location.pathname;var B=A.lastIndexOf("/")+1,z=A.lastIndexOf(".htm");if(B===A.length&&z===-1){return"index"}return A.slice(B,z)}function j(z){var A=new RegExp("[?|&]"+z+"=(.+?)(&|$)").exec(location.href);return(A)?decodeURIComponent(A[1]):""}function y(){if(l()){return i()}else{return j("module")}return""}if(typeof ODSA==="undefined"){if(l()){console.warn("OpenDSA is not configured and may not work properly")}var k={};k.BOOK_NAME=j("bookName");k.SERVER_URL=j("serverURL");k.MODULE_ORIGIN=j("moduleOrigin");k.DEBUG_MODE=false;if(k.MODULE_ORIGIN===""){k.MODULE_ORIGIN=location.protocol+"//"+location.host}window.ODSA={};window.ODSA.SETTINGS=k}u=ODSA.SETTINGS;q=y();u.MODULE_NAME=q;if(u.SERVER_URL!==""&&!u.SERVER_URL.match(/^https:/)){console.warn("Backend communication should use HTTPS")}u.AV_NAME="";function h(z,A){var B=Object.prototype.toString.call(A).slice(8,-1);return A!==undefined&&A!==null&&B===z}function e(){if(localStorage.session){var z=JSON.parse(localStorage.session);return z.username}return"guest"}function m(){if(localStorage.session){var z=JSON.parse(localStorage.session);return z.key}return""}function o(){return localStorage.session}function x(){return(u.SERVER_URL!=="")}function d(z){return Math.round(z*100)/100}function t(z){z=(z)?z:document;return z.location.href.indexOf("/AV/")>-1}function a(z){return(z&&z.parentElement&&z.parentElement.className.match(/.*jsav\w*control.*/)!==null)}function n(z){if(u.DEBUG_MODE){console.group("getJSON()");console.debug(JSON.stringify(z))}if(typeof z==="undefined"){if(u.DEBUG_MODE){console.warn("getJSON() error: data is undefined");console.groupEnd()}return{}}if(h("String",z)){z=jQuery.parseJSON(z)}if(u.DEBUG_MODE){console.groupEnd()}return z}function g(A){var z=[];if(typeof A.type==="undefined"){z.push("type")}if(typeof A.desc==="undefined"){z.push("desc")}if(typeof A.av==="undefined"){z.push("av")}if(typeof A.uiid==="undefined"){z.push("uiid")}if(z.length===1){console.warn("Invalid event, '"+z[0]+"' is undefined");console.log(A);return false}else{if(z.length>1){console.warn("Invalid event, '"+z.join(", ")+"' are undefined");console.log(A);return false}}return true}function w(A){if(u.DEBUG_MODE){console.group("logEvent("+A+")");console.debug(A)}if(x()){A=n(A);var C=["av","desc","module_name","tstamp","type","uiid"];for(var B in A){if(A.hasOwnProperty(B)&&C.indexOf(B)===-1){if(u.DEBUG_MODE){console.warn("Discarding property: "+B)}delete A.prop}}if(typeof A.av==="undefined"){A.av=""}if(typeof A.uiid==="undefined"){A.uiid=b}if(!g(A)){console.warn("logEvent() error: Invalid event");console.log(A);if(u.DEBUG_MODE){console.groupEnd()}return}if(A.av===""&&q===""){if(u.DEBUG_MODE){console.warn('Exercise name and moduleName cannot both be ""');console.groupEnd()}return}A.module=q;if(A.tstamp){A.tstamp=new Date(A.tstamp).getTime()}else{A.tstamp=(new Date()).getTime()}var z=n(localStorage.event_data);if(!z[u.BOOK_NAME]){if(u.DEBUG_MODE){console.debug("Creating a new event_data entry for "+u.BOOK_NAME)}z[u.BOOK_NAME]=[]}z[u.BOOK_NAME].push(A);localStorage.event_data=JSON.stringify(z)}if(u.DEBUG_MODE){console.groupEnd()}}function s(A,D,z,C){z=(z)?z:u.AV_NAME;C=(C)?C:b;if(u.DEBUG_MODE){console.group("logUserAction("+A+", "+D+", "+z+", "+C+")")}if(x()){var B={};B.type=A;B.desc=D;B.av=z;B.uiid=C;w(B)}if(u.DEBUG_MODE){console.groupEnd()}}function c(){if(u.DEBUG_MODE){console.group("sendEventData()")}if(x()){var A=n(localStorage.event_data),B="";if(A[u.BOOK_NAME]){B=JSON.stringify(A[u.BOOK_NAME]);A[u.BOOK_NAME]=[];localStorage.event_data=JSON.stringify(A)}if(B===""||B==="[]"){if(u.DEBUG_MODE){console.debug("No event data to send");console.groupEnd()}return true}var z=m();A.key=(z)?z:"phantom-key";A.book=u.BOOK_NAME;A.actions=B;if(u.DEBUG_MODE){console.debug("Sending eventData:");console.debug(A)}jQuery.ajax({url:u.SERVER_URL+"/api/v1/user/exercise/avbutton/",type:"POST",data:A,contentType:"application/json; charset=utf-8",datatype:"json",xhrFields:{withCredentials:true},success:function(C){C=n(C);if(!C.success){console.group("Event data rejected by server");console.debug(A);console.groupEnd()}},error:function(E){E=n(E);if(E.status===400){console.group("Event data rejected by server");console.debug(A);console.groupEnd()}else{var D=A.key,F=n(B);A=n(localStorage.event_data);for(var C=0;C<F.length;C++){A[u.BOOK_NAME].push(F[C])}localStorage.event_data=JSON.stringify(A);if(E.status===401){f("body").trigger("odsa-session-expired",[D])}else{console.group("Error sending event data");console.debug(E);console.groupEnd()}}}})}if(u.DEBUG_MODE){console.groupEnd()}}function r(){if(x()){var z="",A="";if(this.id!==""){z=this.type+"-"+this.id}else{z=this.type;console.warn(this.value+" button does not have an ID")}if(this.hasAttribute("data-desc")){A=this.getAttribute("data-desc")}else{if(this.value!==""){A=this.value}else{if(this.id!==""){A=this.id}else{if(this.name!==""){A=this.name}}}}s(z,A)}}function p(){if(x()){var z="",A={href:this.href,text:f(this).html};if(u.AV_NAME===""&&this.form){u.AV_NAME=this.form.id}if(this.id!==""){z="hyperlink-"+this.id}else{z="hyperlink";console.warn("Link ("+this.href+") does not have an ID")}s(z,A)}}f(document).ready(function(){var z=function(){var A,B=+new Date();try{localStorage[B]=B;A=(localStorage[B]===B);localStorage.removeItem(B);return A}catch(C){return false}};if(!z){if(jQuery){warn("You must enable DOM storage in your browser.",false)}return}f(":button").each(function(A,B){if(!a(B)){f(B).click(r)}});f("a").each(function(A,B){if(!a(B)&&f(B).attr("id")!=="logon"&&f(B).attr("class")!=="close"){f(B).click(p)}})});var v={};v.serverEnabled=x;v.getUsername=e;v.getSessionKey=m;v.userLoggedIn=o;v.getNameFromURL=i;v.getJSON=n;v.logUserAction=s;v.logEvent=w;v.sendEventData=c;v.roundPercent=d;window.ODSA.UTILS=v}(jQuery));