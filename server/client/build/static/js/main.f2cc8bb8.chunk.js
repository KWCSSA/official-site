(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{103:function(e,t,a){},104:function(e,t,a){},105:function(e,t,a){},107:function(e,t,a){},108:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"fetchHighlightEvent",(function(){return C}));var c=a(0),l=a.n(c),r=a(11),o=a.n(r),s=a(16),m=a(17),i=a(20),u=a(18),E=a(21),d=a(14),p=a(13),h=a(19),v=a(54),f=a.n(v),b=a(34),N=a.n(b),g=a(55),w=a(56),k=a.n(w),C=function(){return function(){var e=Object(g.a)(N.a.mark((function e(t){var a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("http://localhost:8080/api/highlight");case 2:a=e.sent,t({type:"FETCH_HIGHLIGHT_EVENT",payload:a.data});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},y=a(12),j=a(110),x=a(111),O=a(115),S=a(112),A=a(113),T=a(114),H=(a(94),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).toggle=a.toggle.bind(Object(y.a)(a)),a.state={isOpen:!1},a}return Object(E.a)(t,e),Object(m.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"navBarClick",value:function(e){window.location.pathname===e&&this.props.scroll.scrollToTop()}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(j.a,{color:"white",className:"fixed-top shadow-sm",light:!0,expand:"md"},l.a.createElement("div",{className:"container"},l.a.createElement(d.b,{className:"navbar-brand",to:"/",onClick:function(){return e.navBarClick("/")}},l.a.createElement("img",{className:"nav-logo",src:"/logo-wide.png",alt:"KWCSSA banner"})),l.a.createElement(x.a,{onClick:this.toggle}),l.a.createElement(O.a,{isOpen:this.state.isOpen,navbar:!0},l.a.createElement(S.a,{className:"ml-auto",navbar:!0},l.a.createElement(A.a,{className:"ml-1 mr-1"},l.a.createElement(d.b,{to:"/",className:"nav-link",onClick:function(){return e.navBarClick("/")}},"HOME")),l.a.createElement(A.a,{className:"ml-1 mr-1"},l.a.createElement(d.b,{to:"/about",className:"nav-link",onClick:function(){return e.navBarClick("/about")}},"ABOUT")),l.a.createElement(A.a,{className:"ml-1 mr-1"},l.a.createElement(d.b,{to:"/events",className:"nav-link",onClick:function(){return e.navBarClick("/events")}},"EVENTS")),l.a.createElement(A.a,{className:"ml-1 mr-1"},l.a.createElement(d.b,{to:"/contact",className:"nav-link",onClick:function(){return e.navBarClick("/contact")}},"CONTACT")),l.a.createElement(A.a,{className:"ml-1 mr-1"},l.a.createElement(T.a,{href:"http://bbs.uwcssa.com"},"\u8bba\u575b")))))))}}]),t}(l.a.Component));a(103),a(104);var W=function(){return l.a.createElement("section",{className:"section-wrapper mt-3"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row pt-5 text-center"},l.a.createElement("div",{className:"col footer-text"},"Follow Us")),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"underline"})),l.a.createElement("div",{className:"row d-flex align-items-center justify-content-center"},l.a.createElement("img",{className:"footer-qrcode",src:"/wechat-qrcode.jpg",alt:"wechat: uWaterlooCSSA"})),l.a.createElement("div",{className:"row pb-5"},[{name:"weibo",url:"http://www.weibo.com/waterloocssa?topnav=1&wvr=5&topsug=1"},{name:"bilibili",url:"https://space.bilibili.com/432570267"},{name:"douyin",url:"https://www.iesdouyin.com/share/user/94903437884?u_code=14k1l9jkh&sec_uid=MS4wLjABAAAAZytH11upLDVG5Wgaxeu24wJTGiuxIBzuTZRRBSLb87Y"},{name:"facebook",url:"https://www.facebook.com/UWCSSA"},{name:"youtube",url:"https://www.youtube.com/channel/UCWX2hXnIrMP9HQ47u_Mq8hA"},{name:"instagram",url:"https://www.instagram.com/kwcssa"}].map((function(e){var t=e.name,a=e.url,n="/".concat(t,"-logo.png"),c="".concat(t," logo");return l.a.createElement("a",{key:t,className:"col d-flex align-items-center justify-content-center follow-link",href:a},l.a.createElement("img",{className:"footer-logos",src:n,alt:c}))}))),l.a.createElement("div",{className:"row text-center mt-4 pb-4"},l.a.createElement("div",{className:"col copyright"},"\xa9 2006 - 2019 \xa0KWCSSA \xa0ALL RIGHTS RESERVED \xa0\u6ed1\u94c1\u5362-\u57fa\u5947\u7eb3\u4e2d\u56fd\u5b66\u751f\u5b66\u8005\u8054\u8c0a\u4f1a \xa0\u7248\u6743\u6240\u6709"))))};a(105);var B=function(e){var t=e.event;return l.a.createElement("div",{className:"card shadow border",onClick:function(){return e=t.link,void(window.location=e);var e}},l.a.createElement("div",{className:"card-img-top card-img"},l.a.createElement("img",{className:"card-pic",src:"".concat(t.pic),alt:"".concat(t.title," pic")})),l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-title"},t.title),l.a.createElement("div",{className:"card-text"},l.a.createElement("p",null,t.content)),l.a.createElement("div",{className:"card-text"},l.a.createElement("small",{className:"text-muted"},"\u70b9\u51fb\u67e5\u770b\u8be6\u60c5"))))},K=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(m.a)(t,[{key:"renderCards",value:function(){if(this.props.home)return this.props.home.highlight.map((function(e){return l.a.createElement(B,{key:e.title,event:e})}))}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"row pt-5 text-center"},l.a.createElement("div",{className:"col footer-text"},"\u7cbe\u54c1\u6d3b\u52a8")," "),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"underline"})),this.renderCards(),l.a.createElement("div",{className:"row pb-5"}))}}]),t}(l.a.Component);var G=Object(h.b)((function(e){return{home:e.home}}))(K),I=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("section",{className:"home-overlay"},l.a.createElement("div",{className:"overlay-mask d-flex justify-content-center"},l.a.createElement("h1",{className:"ml-sm-5 ml-3 home-text"},"\u6ed1\u94c1\u5362-\u57fa\u5947\u7eb3"),l.a.createElement("h1",{className:"ml-sm-5 ml-3 home-text"},"\u4e2d\u56fd\u5b66\u751f\u5b66\u8005\u8054\u8c0a\u4f1a"),l.a.createElement("h1",{className:"ml-sm-5 ml-3 home-text-eng"},"Kitchener-Waterloo Chinese Student & Scholars Association"))),l.a.createElement("section",{className:"section-wrapper"},l.a.createElement("div",{className:"container mt-3 mb-3 description"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-12 col-lg-4 d-flex align-items-center justify-content-center"},l.a.createElement("img",{src:"/logo.png",alt:"KWCSSA logo",className:"description-logo"})),l.a.createElement("div",{className:"col-12 d-lg-none mt-4 "}),l.a.createElement("div",{className:"col-12 col-lg-8 d-flex align-items-center justify-content-center description-text ch-text"},"\u6ed1\u94c1\u5362\u57fa\u5947\u7eb3\u5b66\u751f\u5b66\u8005\u8054\u8c0a\u4f1a\uff08\u7b80\u79f0KWCSSA\uff09\uff0c\u662fKW\u5730\u533a\u552f\u4e00\u7531\u4e2d\u56fd\u9a7b\u591a\u4f26\u591a\u9886\u4e8b\u9986\u8ba4\u8bc1\u7684\u975e\u8425\u5229\u6027\u7ec4\u7ec7\u3002 \u6ed1\u94c1\u5362\u76ee\u524d\u6709\u8d85\u8fc7\u4e00\u4e07\u4f4d\u7684\u4e2d\u56fd\u5b66\u751f\u5b66\u8005\uff0cKWCSSA\u7684\u5b97\u65e8\u662f\u5e0c\u671b\u901a\u8fc7\u4e3e\u529e\u5404\u7c7b\u5a31\u4e50\u6d3b\u52a8\u3001\u5b66\u672f\u6d3b\u52a8\u4ee5\u53ca\u4ea4\u6d41\u6d3b\u52a8\uff0c\u7f13\u89e3\u5927\u5bb6\u7684\u538b\u529b\u4e30\u5bcc\u5927\u5bb6\u7684\u8bfe\u4f59\u751f\u6d3b\u3002 KWCSSA\u8fd8\u62e5\u6709\u5168\u52a0\u62ff\u5927\u6700\u5927\u7684\u975e\u8425\u5229\u6027\u5b66\u751f\u8bba\u575b-\u6ed1\u5927\u8bba\u575b\uff0c\u6ed1\u5927\u8bba\u575b\u6709\u8d85\u8fc715\u4e07\u7684\u6ce8\u518c\u4f1a\u5458\uff0c\u8fd1\u56db\u767e\u4e07\u7684\u603b\u53d1\u5e16\u91cf\uff0c\u662f\u5728KW\u5730\u533a\u751f\u6d3b\u7684\u5fc5\u5907\u795e\u5668\u3002")))),l.a.createElement("section",{className:"section-wrapper"},l.a.createElement("div",{className:"container pb-5"},l.a.createElement(G,null))),l.a.createElement(W,null))},L=function(){return l.a.createElement(l.a.Fragment,null,"About")},_=function(){return l.a.createElement("h2",null,"Events")},F=function(){return l.a.createElement("h2",null,"Contact")},M=function(){return l.a.createElement("h2",null,"Admin")},R=function(){return l.a.createElement("h2",null,"404")},V=f.a.animateScroll,q=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.fetchHighlightEvent()}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(d.a,null,l.a.createElement(H,{scroll:V}),l.a.createElement(p.c,null,l.a.createElement(p.a,{exact:!0,path:"/",component:I}),l.a.createElement(p.a,{exact:!0,path:"/about",component:L}),l.a.createElement(p.a,{exact:!0,path:"/events",component:_}),l.a.createElement(p.a,{exact:!0,path:"/contact",component:F}),l.a.createElement(p.a,{exact:!0,path:"/admin",component:M}),l.a.createElement(p.a,{component:R}))))}}]),t}(l.a.Component),U=Object(h.b)(null,n)(q),D=a(15),J=a(59),X=Object(D.c)({home:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_HIGHLIGHT_EVENT":return{highlight:t.payload}||[];default:return e}}}),Z=(a(106),a(107),Object(D.d)(X,{},Object(D.a)(J.a)));o.a.render(l.a.createElement(h.a,{store:Z},l.a.createElement(U,null)),document.querySelector("#root"))},60:function(e,t,a){e.exports=a(108)},94:function(e,t,a){}},[[60,1,2]]]);
//# sourceMappingURL=main.f2cc8bb8.chunk.js.map