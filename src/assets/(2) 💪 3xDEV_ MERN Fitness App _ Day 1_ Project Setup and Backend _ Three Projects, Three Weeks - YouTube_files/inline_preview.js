(function(g){var window=this;'use strict';var Lsb=function(a){g.V.call(this,{I:"div",S:"ytp-inline-preview-ui"});this.C=!1;this.player=a;this.T(a,"onStateChange",this.m2);this.T(a,"videodatachange",this.n2);this.T(a,"onInlinePreviewModeChange",this.U7);this.B=new g.Vu(this.j2,null,this);g.N(this,this.B)},J6=function(a){g.TV.call(this,a);
this.j=new Lsb(this.player);g.N(this,this.j);this.j.hide();g.EU(this.player,this.j.element,4);a.isInline()&&(this.load(),a=a.getRootNode(),g.mv(a,["ytp-inline-preview-mode","ytp-no-contextmenu"]))};
g.w(Lsb,g.V);g.k=Lsb.prototype;
g.k.show=function(){g.Wu(this.B);if(!this.C){this.tooltip=new g.eY(this.player,this);g.N(this,this.tooltip);g.EU(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Sd=new g.wW(this.player);g.N(this,this.Sd);this.j=new g.V({I:"div",La:["ytp-inline-preview-scrim"]});g.N(this,this.j);this.j.Ja(this.element);this.T(this.j.element,"click",this.l2);this.D=new g.YX(this.player,this,300);g.N(this,this.D);this.D.Ja(this.j.element);this.controls=new g.V({I:"div",S:"ytp-inline-preview-controls"});g.N(this,
this.controls);this.controls.Ja(this.element);var a=new g.qX(this.player,this,!1);g.N(this,a);a.Ja(this.controls.element);a=new g.WX(this.player,this);g.N(this,a);a.Ja(this.controls.element);this.progressBar=new g.xX(this.player,this);g.N(this,this.progressBar);g.EU(this.player,this.progressBar.element,4);this.T(this.player,"appresize",this.Yb);this.T(this.player,"fullscreentoggled",this.Yb);this.Yb();this.C=!0}0!==this.player.getPlayerState()&&g.V.prototype.show.call(this);this.progressBar.show();
this.player.jb("onInlinePreviewUiReady")};
g.k.hide=function(){this.B.stop();g.V.prototype.hide.call(this);this.player.isInline()||this.C&&this.progressBar.hide()};
g.k.xa=function(){g.V.prototype.xa.call(this)};
g.k.l2=function(a){a.target===this.j.element&&this.player.jb("onExpandInlinePreview",a)};
g.k.U7=function(){g.pv(this.player.getRootNode(),"ytp-inline-preview-mode",this.player.isInline())};
g.k.Xf=function(){this.progressBar.Mc();this.D.Mc()};
g.k.j2=function(){this.Xf();g.Wu(this.B)};
g.k.Yb=function(){g.n0a(this.progressBar,0,this.player.qb().getPlayerSize().width,!1);g.yX(this.progressBar)};
g.k.m2=function(a){this.player.isInline()&&(0===a?this.hide():this.show())};
g.k.n2=function(a,b){if(this.player.isInline()){g.pv(this.player.getRootNode(),"ytp-show-inline-preview-audio-controls",b.aC);var c,d,e;a=!(null==(e=null==(c=b.getPlayerResponse())?void 0:null==(d=c.playerConfig)?void 0:d.inlinePlaybackConfig)||!e.showScrubbingControls);g.pv(this.player.getRootNode(),"ytp-hide-inline-preview-progress-bar",!a)}};
g.k.Re=function(){return this.tooltip};
g.k.Nt=function(a,b,c,d,e){var f=d=0,h=0,l=g.Ds(a);if(b){c=g.kv(b,"ytp-mute-button");var m=g.kv(b,"ytp-subtitles-button"),n=g.Bs(b,this.element);b=g.Ds(b);d=n.y+40;if(m||c)h=n.x-l.width+b.width}else h=c-l.width/2,f=35;b=this.player.qb().getPlayerSize().width;h=g.xe(h,0,b-l.width);d?(a.style.top=d+(e||0)+"px",a.style.bottom=""):(a.style.top="",a.style.bottom=f+"px");a.style.left=h+"px"};g.w(J6,g.TV);J6.prototype.ll=function(){return!1};
J6.prototype.load=function(){this.player.hideControls();this.j.show()};
J6.prototype.unload=function(){this.player.showControls();this.j.hide()};g.SV("inline_preview",J6);})(_yt_player);
