"use strict";function domRouter(e){if(!(this instanceof domRouter))return new domRouter(e);this.routes=e}require.config({baseUrl:"./js",paths:{app:"components/app"},urlArgs:"t="+(new Date).getFullYear()+(new Date).getMonth()+(new Date).getDate()+(new Date).getHours()}),define("jquery",[],function(){return global.jQuery}),domRouter.prototype.init=function(){var e,t=this;$.each(t.routes,function(o,r){if(document.querySelector(t.routes[o].dom))return e=t.routes[o].ctrl,!1}),"function"==typeof e&&e()},require(["app"],function(e){e()});