(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{152:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var o=n(156),r=n(153);function c(e){return Object(o.filter)(r,function(t){return Object(o.includes)(t.title,e)})[0]}},163:function(e,t,n){var content=n(181);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(29).default)("1247dac2",content,!0,{sourceMap:!1})},164:function(e,t,n){"use strict";e.exports=function(e,t){return"string"!=typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)||t?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},179:function(e,t,n){"use strict";var o,r="object"==typeof Reflect?Reflect:null,c=r&&"function"==typeof r.apply?r.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};o=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var h=Number.isNaN||function(e){return e!=e};function l(){l.init.call(this)}e.exports=l,l.EventEmitter=l,l.prototype._events=void 0,l.prototype._eventsCount=0,l.prototype._maxListeners=void 0;var d=10;function f(e){return void 0===e._maxListeners?l.defaultMaxListeners:e._maxListeners}function v(e,t,n,o){var r,c,h,l;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(void 0===(c=e._events)?(c=e._events=Object.create(null),e._eventsCount=0):(void 0!==c.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),c=e._events),h=c[t]),void 0===h)h=c[t]=n,++e._eventsCount;else if("function"==typeof h?h=c[t]=o?[n,h]:[h,n]:o?h.unshift(n):h.push(n),(r=f(e))>0&&h.length>r&&!h.warned){h.warned=!0;var d=new Error("Possible EventEmitter memory leak detected. "+h.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");d.name="MaxListenersExceededWarning",d.emitter=e,d.type=t,d.count=h.length,l=d,console&&console.warn&&console.warn(l)}return e}function y(e,t,n){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=function(){for(var e=[],i=0;i<arguments.length;i++)e.push(arguments[i]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,c(this.listener,this.target,e))}.bind(o);return r.listener=n,o.wrapFn=r,r}function m(e,t,n){var o=e._events;if(void 0===o)return[];var r=o[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),i=0;i<t.length;++i)t[i]=e[i].listener||e[i];return t}(r):x(r,r.length)}function w(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function x(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(l,"defaultMaxListeners",{enumerable:!0,get:function(){return d},set:function(e){if("number"!=typeof e||e<0||h(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");d=e}}),l.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},l.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||h(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},l.prototype.getMaxListeners=function(){return f(this)},l.prototype.emit=function(e){for(var t=[],i=1;i<arguments.length;i++)t.push(arguments[i]);var n="error"===e,o=this._events;if(void 0!==o)n=n&&void 0===o.error;else if(!n)return!1;if(n){var r;if(t.length>0&&(r=t[0]),r instanceof Error)throw r;var h=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw h.context=r,h}var l=o[e];if(void 0===l)return!1;if("function"==typeof l)c(l,this,t);else{var d=l.length,f=x(l,d);for(i=0;i<d;++i)c(f[i],this,t)}return!0},l.prototype.addListener=function(e,t){return v(this,e,t,!1)},l.prototype.on=l.prototype.addListener,l.prototype.prependListener=function(e,t){return v(this,e,t,!0)},l.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,y(this,e,t)),this},l.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,y(this,e,t)),this},l.prototype.removeListener=function(e,t){var n,o,r,i,c;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(o=this._events))return this;if(void 0===(n=o[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){c=n[i].listener,r=i;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(o[e]=n[0]),void 0!==o.removeListener&&this.emit("removeListener",e,c||t)}return this},l.prototype.off=l.prototype.removeListener,l.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},l.prototype.listeners=function(e){return m(this,e,!0)},l.prototype.rawListeners=function(e){return m(this,e,!1)},l.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):w.call(e,t)},l.prototype.listenerCount=w,l.prototype.eventNames=function(){return this._eventsCount>0?o(this._events):[]}},180:function(e,t,n){"use strict";var o=n(163);n.n(o).a},181:function(e,t,n){t=e.exports=n(28)(!1);var o=n(164)(n(182));t.push([e.i,"@-webkit-keyframes scroll-line{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}10%{-webkit-transform:translateY(0);transform:translateY(0)}28%{-webkit-transform:translateY(100%);transform:translateY(100%)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes scroll-line{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}10%{-webkit-transform:translateY(0);transform:translateY(0)}28%{-webkit-transform:translateY(100%);transform:translateY(100%)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}.songlesync{top:0;left:0;position:fixed;width:100%;height:100%}.songle-wrap{top:0;left:0;position:absolute;overflow:hidden}.songle-wrap[data-ua=pc]{width:100%;height:100%;min-width:1280px;min-height:720px}.songle-wrap[data-ua=smartphone]{width:260vw;height:200vh;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);left:50%;top:50%}#songle{top:0;left:0;position:absolute;width:100%;height:100%}.sketch{top:0;left:0;height:100vh;width:100vw;position:relative}.sketch[data-ua=pc]{min-width:1000px;min-height:500px}.sketch-canvas{width:100%!important;height:100%!important;left:0}.beat,.sketch-canvas{position:absolute;top:0}.beat{width:25vw;height:100%}.beat,.dot{pointer-events:none}.dot{padding:100%;background-size:50px 50px,50px 50px;background-position:0 0,25px 25px;background-origin:content-box;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.access,.dot{position:absolute}.access{bottom:30px;left:30px;background:#fff;display:flex;padding:10px}.access-qr{width:100px;height:100px;background-image:url("+o+");background-repeat:no-repeat;background-position:50%;background-size:100% 100%}.access-description{font-family:Open Sans,sans-serif;font-size:12px;width:180px;margin-top:15px;margin-left:10px;line-height:20px}.songle-widget{position:absolute;bottom:30px;right:30px;background:#fff;padding:20px}",""])},182:function(e,t,n){e.exports=n.p+"img/e59e8f7.png"},190:function(e,t,n){"use strict";n.r(t);var meta=n(151),o=n(142),r=n(144),c=n(147),h=n(145),l=n(146),d=(n(22),n(59),n(154)),f=n(150),v=n(166),y=n(143);function m(){return new y.Group}var w=n(155),x=n(148),k=n(159);function S(e){var t="";if(e<=0)return t="00";for(var n=e;e>0;){var o=e;e=o>>4;var r="";if((o%=16)<10)r=""+o;else switch(o){case 10:default:r="A";break;case 11:r="B";break;case 12:r="C";break;case 13:r="D";break;case 14:r="E";break;case 15:r="F"}t=r+t}return n<16&&(t="0"+t),t}var C={brown:10908699,yellow:14461258,beige:14405831,red:13059678,green:4681817,blue:1849196},T=Object.keys(C).length,L=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e.canvas,{isOrbitControls:!0,fps:30}))).deviceType=e.deviceType,n.beatDom=document.querySelector(".beat"),n.beatDomWidth=n.beatDom.offsetWidth,n.dotDom=document.querySelector(".dot"),n.createTextShin(),n.createTextTakara(),n.createTextZima(),n.createLight(),console.log(n.deviceType),n}return Object(l.a)(t,e),Object(r.a)(t,[{key:"createTextShin",value:function(){this.textShinGroup=m();var e=new v.a("新","meshStandardMaterial",{fontType:"shintakarazimaFont",color:C.red,size:1.5,letterSpacing:.2,depth:1,steps:1,isCastShadow:!1});e.position.y-=.5*e.size,e.position.x-=.5*e.size,"pc"===this.deviceType&&(this.textShinGroup.position.x-=e.size+1.5),"smartphone"===this.deviceType&&(this.textShinGroup.position.y+=e.size),this.textShinGroup.rotation.y=Object(x.a)(10),this.textShinGroup.scale.set(1e-4,1e-4,1e-4),this.textShinGroup.add(e),this.add(this.textShinGroup)}},{key:"createTextTakara",value:function(){this.textTakaraGroup=m();var e=new v.a("宝","meshStandardMaterial",{fontType:"shintakarazimaFont",color:C.yellow,size:1.5,letterSpacing:.2,depth:1,steps:1,isCastShadow:!1});e.position.y-=.5*e.size,e.position.x-=.5*e.size,this.textTakaraGroup.rotation.y=Object(x.a)(-10),this.textTakaraGroup.scale.set(1e-4,1e-4,1e-4),this.textTakaraGroup.add(e),this.add(this.textTakaraGroup)}},{key:"createTextZima",value:function(){this.textZimaGroup=m();var e=new v.a("島","meshStandardMaterial",{fontType:"shintakarazimaFont",color:C.blue,size:1.5,letterSpacing:.2,depth:1,steps:1,isCastShadow:!1});e.position.y-=.5*e.size,e.position.x-=.5*e.size,"pc"===this.deviceType&&(this.textZimaGroup.position.x+=e.size+1.5),"smartphone"===this.deviceType&&(this.textZimaGroup.position.y-=e.size),this.textZimaGroup.rotation.y=Object(x.a)(12),this.textZimaGroup.scale.set(1e-4,1e-4,1e-4),this.textZimaGroup.add(e),this.add(this.textZimaGroup)}},{key:"createLight",value:function(){var e={color:C.beige,intensity:.8},t=new w.a("directionalLight",e,{isShadow:!0});t.position.set(8,0,4),this.add(t);var n={color:C.beige,intensity:1.9},o=new w.a("ambientLight",n,{});this.add(o)}},{key:"tweenBeat",value:function(e){this.beatDomWidth=this.beatDom.offsetWidth,this.beatDom.style.background="#".concat(S(this.getRandomColor())),d.e.set(this.beatDom,{x:(e-1)*this.beatDomWidth}),1===e&&this.tweenText(this.textShinGroup),2===e&&(this.tweenBot(),this.tweenText(this.textTakaraGroup)),3===e&&this.tweenText(this.textZimaGroup),4===e&&this.tweenBot()}},{key:"tweenText",value:function(text){new d.d({onComplete:function(){(new d.d).to(text.scale,.5,{x:1e-4,y:1e-4,z:1e-4,ease:d.a.easeInOut})}}).fromTo(text.scale,.2,{x:1e-4,y:1e-4,z:1e-4},{x:2,y:2,z:2,ease:d.a.easeOut})}},{key:"tweenBot",value:function(){var e=10*Math.floor(Object(k.a)(0,10));d.e.to(this.dotDom,.3,{backgroundImage:"radial-gradient(circle farthest-side, #".concat(S(this.getRandomColor())," ").concat(e,"%, transparent 40%, transparent 100%), radial-gradient(circle farthest-side, #").concat(S(this.getRandomColor())," ").concat(e,"%, #").concat(S(this.getRandomColor())," 25%, #").concat(S(this.getRandomColor())," 40%, transparent 40%, transparent 100%)"),backgroundSize:"".concat(e,"px ").concat(e,"px, ").concat(e,"px ").concat(e,"px"),backgroundPosition:"0px 0px, ".concat(e,"px ").concat(e,"px"),ease:d.a.easeInOut})}},{key:"getRandomColor",value:function(){return C[Object.keys(C)[Math.floor(Object(k.a)(0,T))]]}},{key:"render",value:function(){this.controls.update(),this.renderer.render(this.scene,this.camera)}}]),t}(f.a),O=(n(89),n(88),n(32),n(179)),_={accessToken:"00000089-AKAGHDR",secretToken:"GsyRgZGk3J1p7CVyQSF38Px8DjY3uqs3"},j="https://www.youtube.com/watch?v=LIlZCmETvsY",E=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(c.a)(this,Object(h.a)(t).call(this))).chord="",e.onBeatEnter=function(t){switch(t.data.beat.position){case 1:e.emit("beat",1);break;case 2:e.emit("beat",2);break;case 3:e.emit("beat",3);break;case 4:e.emit("beat",4)}},e.onPlay=function(e){console.log("play")},e.onSeek=function(e){console.log(e,"seek")},e.onPause=function(e){console.log("pause")},e.onFinish=function(t){e.player.seekTo(0),e.emit("finish")},e.onChordEnter=function(t){"N"!==t.data.chord.name?(e.chord=t.data.chord.name,e.emit("chord",e.chord)):e.chord=""},e.onChorusSectionEnter=function(t){console.log(t,"サビ開始"),e.emit("chorus","enter")},e.onChorusSectionLeave=function(t){console.log(t,"サビ終わり"),e.emit("chorus","leave")},e}return Object(l.a)(t,e),Object(r.a)(t,[{key:"setApi",value:function(){var e=this;window.onSongleWidgetAPIReady=function(t){e.SW=t,e.SW.System.defaultEndpointWebClientProtocol="https:",e.init()}}},{key:"init",value:function(){var e=this;if("1"===this.getUrlVars().master){var t=document.querySelector("#songle"),n=document.querySelector(".songle-widget");console.log("songle",t),console.log("songlewidget",n),this.player=new this.SW.Player({mediaElement:"#songle"}),this.player.accessToken=_.accessToken,this.player.secretToken=_.secretToken,this.player.useMedia(j),this.player.addPlugin(new this.SW.Plugin.SongleWidget({element:".songle-widget"}))}else this.player=new this.SW.Player({mediaElement:"#songle"}),this.player.accessToken=_.accessToken,this.player.useMedia(j);this.player.on("play",this.onPlay),this.player.on("seek",this.onSeek),this.player.on("pause",this.onPause),this.player.on("finish",this.onFinish),this.player.addPlugin(new this.SW.Plugin.SongleSync),this.player.addPlugin(new this.SW.Plugin.Beat),this.player.addPlugin(new this.SW.Plugin.Chorus),this.player.addPlugin(new this.SW.Plugin.Chord),this.setBeatEvent(),this.setChordEvent(),this.setChorusEvent(),this.onMediaReady=function(){console.log("mediaReady"),e.player.stop(),setTimeout(function(){e.player.stop(),e.player.play(),e.player.seekTo(0),e.emit("play")},2e3)},this.player.on("mediaReady",this.onMediaReady)}},{key:"setBeatEvent",value:function(){this.player.on("beatEnter",this.onBeatEnter)}},{key:"setChordEvent",value:function(){this.player.on("chordEnter",this.onChordEnter)}},{key:"setChorusEvent",value:function(){this.player.on("chorusSectionEnter",this.onChorusSectionEnter),this.player.on("chorusSectionLeave",this.onChorusSectionLeave)}},{key:"getUrlVars",value:function(){var i,e,t,n,p,o,r={},param=location.search.substring(1).split("&");for(i=0,n=param.length;i<n;i++)e="",-1!==(t=(p=param[i]).search(/=/))&&(e=p.slice(0,t),o=p.slice(p.indexOf("=",0)+1),""!==e&&(r[e]=decodeURI(o)));return r}},{key:"destroy",value:function(){this.player.stop(),this.SW=null,this.player=null}}]),t}(n.n(O).a),P=n(152),G=Object(P.a)("SongleSync"),R={mixins:[meta.a],data:function(){return{meta:{title:"DesignCoding | ".concat(G.title),description:"".concat(G.description),type:"article",url:"https://machida-yosuke.github.io/design-coding/".concat(G.title,"/"),image:"https://example.com/img/ogp/".concat(G.title,"/ogp.png")}}},mounted:function(){var e=this,t=this.$ua.deviceType();this.deviceType=t,console.log(this.deviceType),this.beat=function(t){console.log(t,"beat"),e.sketch.tweenBeat(t)},this.chorus=function(t){"enter"===t&&(e.isShowCanvas=1,e.isShowDot=1,e.isShowBeat=0),"leave"===t&&(e.isShowCanvas=0,e.isShowBeat=1)},this.chord=function(e){console.log(e,"chord")},this.finish=function(){e.isShowBeat=1,e.isShowDot=0,e.isShowCanvas=0},this.$nextTick(function(){e.songleSync=new E,e.songleSync.setApi(),e.songleSync.on("play",e.createSongleSyncCanvas),e.songleSync.on("beat",e.beat),e.songleSync.on("chorus",e.chorus),e.songleSync.on("chord",e.chord),e.songleSync.on("finish",e.finish)})},destroyed:function(){this.songleSync.removeListener("play",this.createSongleSyncCanvas),this.songleSync.removeListener("beat",this.beat),this.songleSync.removeListener("chorus",this.chorus),this.songleSync.removeListener("chord",this.chord),this.songleSync.removeListener("finish",this.finish),this.songleSync.destroy()},methods:{createSongleSyncCanvas:function(){this.sketch=new L({canvas:this.$refs.sketchCanvas,deviceType:this.deviceType}),this.sketch.start(),this.isShowCanvas=0}}},z=(n(180),n(15)),component=Object(z.a)(R,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"songlesync"},[n("div",{staticClass:"songle-wrap",attrs:{"data-ua":e.deviceType}},[n("div",{attrs:{id:"songle"}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowBeat,expression:"isShowBeat"}],staticClass:"beat"}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowDot,expression:"isShowDot"}],staticClass:"dot"}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowCanvas,expression:"isShowCanvas"}],staticClass:"sketch",attrs:{"data-ua":e.deviceType}},[n("canvas",{ref:"sketchCanvas",staticClass:"sketch-canvas"})]),"pc"==e.deviceType?n("div",{staticClass:"songle-widget"}):e._e(),"pc"==e.deviceType?n("div",{staticClass:"access"},[n("div",{staticClass:"access-qr"}),n("div",{staticClass:"access-description"},[e._v("本ページから動画を再生した後、スマホでアクセスすると画面が、シンクロしています。")])]):e._e()])},[],!1,null,null,null);t.default=component.exports}}]);