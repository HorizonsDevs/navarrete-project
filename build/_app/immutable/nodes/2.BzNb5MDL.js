import{s as kt,g as zt,a as st,t as rt,b as X,c as gt}from"../chunks/disclose-version.Cr6NpmaU.js";import{ai as Be,a0 as Ne,Y as dt,a3 as Kt,$ as Fe,C as $e,ar as be,a1 as Oe,a2 as de,a4 as jt,a8 as Lt,a5 as xe,a6 as _e,a7 as Re,au as Yt,z as pe,av as Ve,aw as Ue,ax as He,W as Ge,v as ve,ay as Ke,az as je,aq as Ye,aA as qe,aB as Xe,af as Qe,an as Ze,al as Je,p as bt,aC as Nt,aD as Zt,i as we,j as xt,g as N,x as et,k as T,l as C,m as P,at as nt,t as ht,aE as We}from"../chunks/utils.BM_9wC3W.js";import{s as V,t as Dt,a as tn,l as en,b as nn}from"../chunks/languageStore.DGeuuLUh.js";import{b as ye,p as sn}from"../chunks/props.ClcHdPE-.js";import{i as At}from"../chunks/lifecycle.B7Xglijg.js";import{o as Jt}from"../chunks/index-client.D_F-FYE7.js";import{d as rn}from"../chunks/index.DFM7aci-.js";let qt=null;function Wt(t,e){return e}function on(t,e,s,r){for(var c=[],i=e.length,n=0;n<i;n++)je(e[n].e,c,!0);var u=i>0&&c.length===0&&s!==null;if(u){var a=s.parentNode;Ye(a),a.append(s),r.clear(),lt(t,e[0].prev,e[i-1].next)}qe(c,()=>{for(var o=0;o<i;o++){var m=e[o];u||(r.delete(m.k),lt(t,m.prev,m.next)),Xe(m.e,!u)}})}function te(t,e,s,r,c,i=null){var n=t,u={flags:e,items:new Map,first:null};{var a=t;n=dt?Kt(Qe(a)):a.appendChild(Be())}dt&&Fe();var o=null,m=!1;Ne(()=>{var l=s(),v=$e(l)?l:l==null?[]:be(l),h=v.length;if(m&&h===0)return;m=h===0;let f=!1;if(dt){var g=n.data===Oe;g!==(h===0)&&(n=de(),Kt(n),jt(!1),f=!0)}if(dt){for(var d=null,p,b=0;b<h;b++){if(Lt.nodeType===8&&Lt.data===Ze){n=Lt,f=!0,jt(!1);break}var x=v[b],w=r(x,b);p=Se(Lt,u,d,null,x,w,b,c,e),u.items.set(w,p),d=p}h>0&&Kt(de())}dt||an(v,u,n,c,e,r),i!==null&&(h===0?o?xe(o):o=_e(()=>i(n)):o!==null&&Re(o,()=>{o=null})),f&&jt(!0),s()}),dt&&(n=Lt)}function an(t,e,s,r,c,i){var n=t.length,u=e.items,a=e.first,o=a,m,l=null,v=[],h=[],f,g,d,p;for(p=0;p<n;p+=1){if(f=t[p],g=i(f,p),d=u.get(g),d===void 0){var b=o?o.e.nodes_start:s;l=Se(b,e,l,l===null?e.first:l.next,f,g,p,r,c),u.set(g,l),v=[],h=[],o=l.next;continue}if(cn(d,f,p),d.e.f&Yt&&xe(d.e),d!==o){if(m!==void 0&&m.has(d)){if(v.length<h.length){var x=h[0],w;l=x.prev;var E=v[0],L=v[v.length-1];for(w=0;w<v.length;w+=1)me(v[w],x,s);for(w=0;w<h.length;w+=1)m.delete(h[w]);lt(e,E.prev,L.next),lt(e,l,E),lt(e,L,x),o=x,l=L,p-=1,v=[],h=[]}else m.delete(d),me(d,o,s),lt(e,d.prev,d.next),lt(e,d,l===null?e.first:l.next),lt(e,l,d),l=d;continue}for(v=[],h=[];o!==null&&o.k!==g;)o.e.f&Yt||(m??(m=new Set)).add(o),h.push(o),o=o.next;if(o===null)continue;d=o}v.push(d),l=d,o=d.next}if(o!==null||m!==void 0){for(var y=m===void 0?[]:be(m);o!==null;)o.e.f&Yt||y.push(o),o=o.next;var S=y.length;if(S>0){var z=n===0?s:null;on(e,y,z,u)}}pe.first=e.first&&e.first.e,pe.last=l&&l.e}function cn(t,e,s,r){Ve(t.v,e),t.i=s}function Se(t,e,s,r,c,i,n,u,a){var o=qt;try{var m=(a&Ue)!==0,l=(a&He)===0,v=m?l?Ge(c):ve(c):c,h=a&Ke?ve(n):n,f={i:h,v,k:i,a:null,e:null,prev:s,next:r};return qt=f,f.e=_e(()=>u(t,v,h),dt),f.e.prev=s&&s.e,f.e.next=r&&r.e,s===null?e.first=f:(s.next=f,s.e.next=f.e),r!==null&&(r.prev=f,r.e.prev=f.e),f}finally{qt=o}}function me(t,e,s){for(var r=t.next?t.next.e.nodes_start:s,c=e?e.e.nodes_start:s,i=t.e.nodes_start;i!==r;){var n=Je(i);c.before(i),i=n}}function lt(t,e,s){e===null?t.first=s:(e.next=s,e.e.next=s&&s.e),s!==null&&(s.prev=e,s.e.prev=e&&e.e)}function ee(t){return typeof t=="number"}function Xt(t){return typeof t=="string"}function Ft(t){return typeof t=="boolean"}function ge(t){return Object.prototype.toString.call(t)==="[object Object]"}function A(t){return Math.abs(t)}function ne(t){return Math.sign(t)}function Et(t,e){return A(t-e)}function ln(t,e){if(t===0||e===0||A(t)<=A(e))return 0;const s=Et(A(t),A(e));return A(s/t)}function Tt(t){return It(t).map(Number)}function H(t){return t[Pt(t)]}function Pt(t){return Math.max(0,t.length-1)}function se(t,e){return e===Pt(t)}function he(t,e=0){return Array.from(Array(t),(s,r)=>e+r)}function It(t){return Object.keys(t)}function Le(t,e){return[t,e].reduce((s,r)=>(It(r).forEach(c=>{const i=s[c],n=r[c],u=ge(i)&&ge(n);s[c]=u?Le(i,n):n}),s),{})}function Qt(t,e){return typeof e.MouseEvent<"u"&&t instanceof e.MouseEvent}function un(t,e){const s={start:r,center:c,end:i};function r(){return 0}function c(a){return i(a)/2}function i(a){return e-a}function n(a,o){return Xt(t)?s[t](a):t(e,a,o)}return{measure:n}}function Mt(){let t=[];function e(c,i,n,u={passive:!0}){let a;if("addEventListener"in c)c.addEventListener(i,n,u),a=()=>c.removeEventListener(i,n,u);else{const o=c;o.addListener(n),a=()=>o.removeListener(n)}return t.push(a),r}function s(){t=t.filter(c=>c())}const r={add:e,clear:s};return r}function fn(t,e,s,r){const c=Mt(),i=1e3/60;let n=null,u=0,a=0;function o(){c.add(t,"visibilitychange",()=>{t.hidden&&f()})}function m(){h(),c.clear()}function l(d){if(!a)return;n||(n=d);const p=d-n;for(n=d,u+=p;u>=i;)s(i),u-=i;const b=u/i;r(b),a&&e.requestAnimationFrame(l)}function v(){a||(a=e.requestAnimationFrame(l))}function h(){e.cancelAnimationFrame(a),n=null,u=0,a=0}function f(){n=null,u=0}return{init:o,destroy:m,start:v,stop:h,update:()=>s(i),render:r}}function dn(t,e){const s=e==="rtl",r=t==="y",c=r?"y":"x",i=r?"x":"y",n=!r&&s?-1:1,u=m(),a=l();function o(f){const{height:g,width:d}=f;return r?g:d}function m(){return r?"top":s?"right":"left"}function l(){return r?"bottom":s?"left":"right"}function v(f){return f*n}return{scroll:c,cross:i,startEdge:u,endEdge:a,measureSize:o,direction:v}}function pt(t=0,e=0){const s=A(t-e);function r(o){return o<t}function c(o){return o>e}function i(o){return r(o)||c(o)}function n(o){return i(o)?r(o)?t:e:o}function u(o){return s?o-s*Math.ceil((o-e)/s):o}return{length:s,max:e,min:t,constrain:n,reachedAny:i,reachedMax:c,reachedMin:r,removeOffset:u}}function Ce(t,e,s){const{constrain:r}=pt(0,t),c=t+1;let i=n(e);function n(v){return s?A((c+v)%c):r(v)}function u(){return i}function a(v){return i=n(v),l}function o(v){return m().set(u()+v)}function m(){return Ce(t,u(),s)}const l={get:u,set:a,add:o,clone:m};return l}function pn(t,e,s,r,c,i,n,u,a,o,m,l,v,h,f,g,d,p,b){const{cross:x,direction:w}=t,E=["INPUT","SELECT","TEXTAREA"],L={passive:!1},y=Mt(),S=Mt(),z=pt(50,225).constrain(h.measure(20)),k={mouse:300,touch:400},I={mouse:500,touch:600},O=f?43:25;let G=!1,K=0,j=0,ut=!1,ot=!1,Q=!1,Z=!1;function _t(_){if(!b)return;function M($){(Ft(b)||b(_,$))&&yt($)}const B=e;y.add(B,"dragstart",$=>$.preventDefault(),L).add(B,"touchmove",()=>{},L).add(B,"touchend",()=>{}).add(B,"touchstart",M).add(B,"mousedown",M).add(B,"touchcancel",F).add(B,"contextmenu",F).add(B,"click",W,!0)}function Y(){y.clear(),S.clear()}function vt(){const _=Z?s:e;S.add(_,"touchmove",R,L).add(_,"touchend",F).add(_,"mousemove",R,L).add(_,"mouseup",F)}function mt(_){const M=_.nodeName||"";return E.includes(M)}function J(){return(f?I:k)[Z?"mouse":"touch"]}function wt(_,M){const B=l.add(ne(_)*-1),$=m.byDistance(_,!f).distance;return f||A(_)<z?$:d&&M?$*.5:m.byIndex(B.get(),0).distance}function yt(_){const M=Qt(_,r);Z=M,Q=f&&M&&!_.buttons&&G,G=Et(c.get(),n.get())>=2,!(M&&_.button!==0)&&(mt(_.target)||(ut=!0,i.pointerDown(_),o.useFriction(0).useDuration(0),c.set(n),vt(),K=i.readPoint(_),j=i.readPoint(_,x),v.emit("pointerDown")))}function R(_){if(!Qt(_,r)&&_.touches.length>=2)return F(_);const B=i.readPoint(_),$=i.readPoint(_,x),q=Et(B,K),tt=Et($,j);if(!ot&&!Z&&(!_.cancelable||(ot=q>tt,!ot)))return F(_);const it=i.pointerMove(_);q>g&&(Q=!0),o.useFriction(.3).useDuration(.75),u.start(),c.add(w(it)),_.preventDefault()}function F(_){const B=m.byDistance(0,!1).index!==l.get(),$=i.pointerUp(_)*J(),q=wt(w($),B),tt=ln($,q),it=O-10*tt,at=p+tt/50;ot=!1,ut=!1,S.clear(),o.useDuration(it).useFriction(at),a.distance(q,!f),Z=!1,v.emit("pointerUp")}function W(_){Q&&(_.stopPropagation(),_.preventDefault(),Q=!1)}function U(){return ut}return{init:_t,destroy:Y,pointerDown:U}}function vn(t,e){let r,c;function i(l){return l.timeStamp}function n(l,v){const f=`client${(v||t.scroll)==="x"?"X":"Y"}`;return(Qt(l,e)?l:l.touches[0])[f]}function u(l){return r=l,c=l,n(l)}function a(l){const v=n(l)-n(c),h=i(l)-i(r)>170;return c=l,h&&(r=l),v}function o(l){if(!r||!c)return 0;const v=n(c)-n(r),h=i(l)-i(r),f=i(l)-i(c)>170,g=v/h;return h&&!f&&A(g)>.1?g:0}return{pointerDown:u,pointerMove:a,pointerUp:o,readPoint:n}}function mn(){function t(s){const{offsetTop:r,offsetLeft:c,offsetWidth:i,offsetHeight:n}=s;return{top:r,right:c+i,bottom:r+n,left:c,width:i,height:n}}return{measure:t}}function gn(t){function e(r){return t*(r/100)}return{measure:e}}function hn(t,e,s,r,c,i,n){const u=[t].concat(r);let a,o,m=[],l=!1;function v(d){return c.measureSize(n.measure(d))}function h(d){if(!i)return;o=v(t),m=r.map(v);function p(b){for(const x of b){if(l)return;const w=x.target===t,E=r.indexOf(x.target),L=w?o:m[E],y=v(w?t:r[E]);if(A(y-L)>=.5){d.reInit(),e.emit("resize");break}}}a=new ResizeObserver(b=>{(Ft(i)||i(d,b))&&p(b)}),s.requestAnimationFrame(()=>{u.forEach(b=>a.observe(b))})}function f(){l=!0,a&&a.disconnect()}return{init:h,destroy:f}}function bn(t,e,s,r,c,i){let n=0,u=0,a=c,o=i,m=t.get(),l=0;function v(L){const y=L/1e3,S=a*y,z=r.get()-t.get(),k=!a;let I=0;return k?(n=0,s.set(r),t.set(r),I=z):(s.set(t),n+=z/S,n*=o,m+=n,t.add(n*y),I=m-l),u=ne(I),l=m,E}function h(){const L=r.get()-e.get();return A(L)<.001}function f(){return a}function g(){return u}function d(){return n}function p(){return x(c)}function b(){return w(i)}function x(L){return a=L,E}function w(L){return o=L,E}const E={direction:g,duration:f,velocity:d,seek:v,settled:h,useBaseFriction:b,useBaseDuration:p,useFriction:w,useDuration:x};return E}function xn(t,e,s,r,c){const i=c.measure(10),n=c.measure(50),u=pt(.1,.99);let a=!1;function o(){return!(a||!t.reachedAny(s.get())||!t.reachedAny(e.get()))}function m(h){if(!o())return;const f=t.reachedMin(e.get())?"min":"max",g=A(t[f]-e.get()),d=s.get()-e.get(),p=u.constrain(g/n);s.subtract(d*p),!h&&A(d)<i&&(s.set(t.constrain(s.get())),r.useDuration(25).useBaseFriction())}function l(h){a=!h}return{shouldConstrain:o,constrain:m,toggleActive:l}}function _n(t,e,s,r,c){const i=pt(-e+t,0),n=l(),u=m(),a=v();function o(f,g){return Et(f,g)<1}function m(){const f=n[0],g=H(n),d=n.lastIndexOf(f),p=n.indexOf(g)+1;return pt(d,p)}function l(){return s.map((f,g)=>{const{min:d,max:p}=i,b=i.constrain(f),x=!g,w=se(s,g);return x?p:w||o(d,b)?d:o(p,b)?p:b}).map(f=>parseFloat(f.toFixed(3)))}function v(){if(e<=t+c)return[i.max];if(r==="keepSnaps")return n;const{min:f,max:g}=u;return n.slice(f,g)}return{snapsContained:a,scrollContainLimit:u}}function wn(t,e,s){const r=e[0],c=s?r-t:H(e);return{limit:pt(c,r)}}function yn(t,e,s,r){const i=e.min+.1,n=e.max+.1,{reachedMin:u,reachedMax:a}=pt(i,n);function o(v){return v===1?a(s.get()):v===-1?u(s.get()):!1}function m(v){if(!o(v))return;const h=t*(v*-1);r.forEach(f=>f.add(h))}return{loop:m}}function Sn(t){const{max:e,length:s}=t;function r(i){const n=i-e;return s?n/-s:0}return{get:r}}function Ln(t,e,s,r,c){const{startEdge:i,endEdge:n}=t,{groupSlides:u}=c,a=l().map(e.measure),o=v(),m=h();function l(){return u(r).map(g=>H(g)[n]-g[0][i]).map(A)}function v(){return r.map(g=>s[i]-g[i]).map(g=>-A(g))}function h(){return u(o).map(g=>g[0]).map((g,d)=>g+a[d])}return{snaps:o,snapsAligned:m}}function Cn(t,e,s,r,c,i){const{groupSlides:n}=c,{min:u,max:a}=r,o=m();function m(){const v=n(i),h=!t||e==="keepSnaps";return s.length===1?[i]:h?v:v.slice(u,a).map((f,g,d)=>{const p=!g,b=se(d,g);if(p){const x=H(d[0])+1;return he(x)}if(b){const x=Pt(i)-H(d)[0]+1;return he(x,H(d)[0])}return f})}return{slideRegistry:o}}function En(t,e,s,r,c){const{reachedAny:i,removeOffset:n,constrain:u}=r;function a(f){return f.concat().sort((g,d)=>A(g)-A(d))[0]}function o(f){const g=t?n(f):u(f),d=e.map((b,x)=>({diff:m(b-g,0),index:x})).sort((b,x)=>A(b.diff)-A(x.diff)),{index:p}=d[0];return{index:p,distance:g}}function m(f,g){const d=[f,f+s,f-s];if(!t)return f;if(!g)return a(d);const p=d.filter(b=>ne(b)===g);return p.length?a(p):H(d)-s}function l(f,g){const d=e[f]-c.get(),p=m(d,g);return{index:f,distance:p}}function v(f,g){const d=c.get()+f,{index:p,distance:b}=o(d),x=!t&&i(d);if(!g||x)return{index:p,distance:f};const w=e[p]-b,E=f+m(w,0);return{index:p,distance:E}}return{byDistance:v,byIndex:l,shortcut:m}}function zn(t,e,s,r,c,i,n){function u(l){const v=l.distance,h=l.index!==e.get();i.add(v),v&&(r.duration()?t.start():(t.update(),t.render(1),t.update())),h&&(s.set(e.get()),e.set(l.index),n.emit("select"))}function a(l,v){const h=c.byDistance(l,v);u(h)}function o(l,v){const h=e.clone().set(l),f=c.byIndex(h.get(),v);u(f)}return{distance:a,index:o}}function Tn(t,e,s,r,c,i,n,u){const a={passive:!0,capture:!0};let o=0;function m(h){if(!u)return;function f(g){if(new Date().getTime()-o>10)return;n.emit("slideFocusStart"),t.scrollLeft=0;const b=s.findIndex(x=>x.includes(g));ee(b)&&(c.useDuration(0),r.index(b,0),n.emit("slideFocus"))}i.add(document,"keydown",l,!1),e.forEach((g,d)=>{i.add(g,"focus",p=>{(Ft(u)||u(h,p))&&f(d)},a)})}function l(h){h.code==="Tab"&&(o=new Date().getTime())}return{init:m}}function Ct(t){let e=t;function s(){return e}function r(a){e=n(a)}function c(a){e+=n(a)}function i(a){e-=n(a)}function n(a){return ee(a)?a:a.get()}return{get:s,set:r,add:c,subtract:i}}function Ee(t,e){const s=t.scroll==="x"?i:n,r=e.style;let c=!1;function i(l){return`translate3d(${l}px,0px,0px)`}function n(l){return`translate3d(0px,${l}px,0px)`}function u(l){c||(r.transform=s(t.direction(l)))}function a(l){c=!l}function o(){c||(r.transform="",e.getAttribute("style")||e.removeAttribute("style"))}return{clear:o,to:u,toggleActive:a}}function In(t,e,s,r,c,i,n,u,a){const m=Tt(c),l=Tt(c).reverse(),v=p().concat(b());function h(y,S){return y.reduce((z,k)=>z-c[k],S)}function f(y,S){return y.reduce((z,k)=>h(z,S)>0?z.concat([k]):z,[])}function g(y){return i.map((S,z)=>({start:S-r[z]+.5+y,end:S+e-.5+y}))}function d(y,S,z){const k=g(S);return y.map(I=>{const O=z?0:-s,G=z?s:0,K=z?"end":"start",j=k[I][K];return{index:I,loopPoint:j,slideLocation:Ct(-1),translate:Ee(t,a[I]),target:()=>u.get()>j?O:G}})}function p(){const y=n[0],S=f(l,y);return d(S,s,!1)}function b(){const y=e-n[0]-1,S=f(m,y);return d(S,-s,!0)}function x(){return v.every(({index:y})=>{const S=m.filter(z=>z!==y);return h(S,e)<=.1})}function w(){v.forEach(y=>{const{target:S,translate:z,slideLocation:k}=y,I=S();I!==k.get()&&(z.to(I),k.set(I))})}function E(){v.forEach(y=>y.translate.clear())}return{canLoop:x,clear:E,loop:w,loopPoints:v}}function Mn(t,e,s){let r,c=!1;function i(a){if(!s)return;function o(m){for(const l of m)if(l.type==="childList"){a.reInit(),e.emit("slidesChanged");break}}r=new MutationObserver(m=>{c||(Ft(s)||s(a,m))&&o(m)}),r.observe(t,{childList:!0})}function n(){r&&r.disconnect(),c=!0}return{init:i,destroy:n}}function kn(t,e,s,r){const c={};let i=null,n=null,u,a=!1;function o(){u=new IntersectionObserver(f=>{a||(f.forEach(g=>{const d=e.indexOf(g.target);c[d]=g}),i=null,n=null,s.emit("slidesInView"))},{root:t.parentElement,threshold:r}),e.forEach(f=>u.observe(f))}function m(){u&&u.disconnect(),a=!0}function l(f){return It(c).reduce((g,d)=>{const p=parseInt(d),{isIntersecting:b}=c[p];return(f&&b||!f&&!b)&&g.push(p),g},[])}function v(f=!0){if(f&&i)return i;if(!f&&n)return n;const g=l(f);return f&&(i=g),f||(n=g),g}return{init:o,destroy:m,get:v}}function Dn(t,e,s,r,c,i){const{measureSize:n,startEdge:u,endEdge:a}=t,o=s[0]&&c,m=f(),l=g(),v=s.map(n),h=d();function f(){if(!o)return 0;const b=s[0];return A(e[u]-b[u])}function g(){if(!o)return 0;const b=i.getComputedStyle(H(r));return parseFloat(b.getPropertyValue(`margin-${a}`))}function d(){return s.map((b,x,w)=>{const E=!x,L=se(w,x);return E?v[x]+m:L?v[x]+l:w[x+1][u]-b[u]}).map(A)}return{slideSizes:v,slideSizesWithGaps:h,startGap:m,endGap:l}}function An(t,e,s,r,c,i,n,u,a){const{startEdge:o,endEdge:m,direction:l}=t,v=ee(s);function h(p,b){return Tt(p).filter(x=>x%b===0).map(x=>p.slice(x,x+b))}function f(p){return p.length?Tt(p).reduce((b,x,w)=>{const E=H(b)||0,L=E===0,y=x===Pt(p),S=c[o]-i[E][o],z=c[o]-i[x][m],k=!r&&L?l(n):0,I=!r&&y?l(u):0,O=A(z-I-(S+k));return w&&O>e+a&&b.push(x),y&&b.push(p.length),b},[]).map((b,x,w)=>{const E=Math.max(w[x-1]||0);return p.slice(E,b)}):[]}function g(p){return v?h(p,s):f(p)}return{groupSlides:g}}function Pn(t,e,s,r,c,i,n){const{align:u,axis:a,direction:o,startIndex:m,loop:l,duration:v,dragFree:h,dragThreshold:f,inViewThreshold:g,slidesToScroll:d,skipSnaps:p,containScroll:b,watchResize:x,watchSlides:w,watchDrag:E,watchFocus:L}=i,y=2,S=mn(),z=S.measure(e),k=s.map(S.measure),I=dn(a,o),O=I.measureSize(z),G=gn(O),K=un(u,O),j=!l&&!!b,ut=l||!!b,{slideSizes:ot,slideSizesWithGaps:Q,startGap:Z,endGap:_t}=Dn(I,z,k,s,ut,c),Y=An(I,O,d,l,z,k,Z,_t,y),{snaps:vt,snapsAligned:mt}=Ln(I,K,z,k,Y),J=-H(vt)+H(Q),{snapsContained:wt,scrollContainLimit:yt}=_n(O,J,mt,b,y),R=j?wt:mt,{limit:F}=wn(J,R,l),W=Ce(Pt(R),m,l),U=W.clone(),D=Tt(s),_=({dragHandler:ct,scrollBody:Ut,scrollBounds:Ht,options:{loop:Bt}},Gt)=>{Bt||Ht.constrain(ct.pointerDown()),Ut.seek(Gt)},M=({scrollBody:ct,translate:Ut,location:Ht,offsetLocation:Bt,scrollLooper:Gt,slideLooper:Ie,dragHandler:Me,animation:ke,eventHandler:ae,scrollBounds:De,options:{loop:ce}},le)=>{const ue=ct.settled(),Ae=!De.shouldConstrain(),fe=ce?ue:ue&&Ae;fe&&!Me.pointerDown()&&(ke.stop(),ae.emit("settle")),fe||ae.emit("scroll");const Pe=Ht.get()*le+it.get()*(1-le);Bt.set(Pe),ce&&(Gt.loop(ct.direction()),Ie.loop()),Ut.to(Bt.get())},B=fn(r,c,ct=>_(Vt,ct),ct=>M(Vt,ct)),$=.68,q=R[W.get()],tt=Ct(q),it=Ct(q),at=Ct(q),ft=Ct(q),St=bn(tt,at,it,ft,v,$),Ot=En(l,R,J,F,ft),Rt=zn(B,W,U,St,Ot,ft,n),re=Sn(F),oe=Mt(),ze=kn(e,s,n,g),{slideRegistry:ie}=Cn(j,b,R,yt,Y,D),Te=Tn(t,s,ie,Rt,St,oe,n,L),Vt={ownerDocument:r,ownerWindow:c,eventHandler:n,containerRect:z,slideRects:k,animation:B,axis:I,dragHandler:pn(I,t,r,c,ft,vn(I,c),tt,B,Rt,St,Ot,W,n,G,h,f,p,$,E),eventStore:oe,percentOfView:G,index:W,indexPrevious:U,limit:F,location:tt,offsetLocation:at,previousLocation:it,options:i,resizeHandler:hn(e,n,c,s,I,x,S),scrollBody:St,scrollBounds:xn(F,at,ft,St,G),scrollLooper:yn(J,F,at,[tt,at,it,ft]),scrollProgress:re,scrollSnapList:R.map(re.get),scrollSnaps:R,scrollTarget:Ot,scrollTo:Rt,slideLooper:In(I,O,J,ot,Q,vt,R,at,s),slideFocus:Te,slidesHandler:Mn(e,n,w),slidesInView:ze,slideIndexes:D,slideRegistry:ie,slidesToScroll:Y,target:ft,translate:Ee(I,e)};return Vt}function Bn(){let t={},e;function s(o){e=o}function r(o){return t[o]||[]}function c(o){return r(o).forEach(m=>m(e,o)),a}function i(o,m){return t[o]=r(o).concat([m]),a}function n(o,m){return t[o]=r(o).filter(l=>l!==m),a}function u(){t={}}const a={init:s,emit:c,off:n,on:i,clear:u};return a}const Nn={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function Fn(t){function e(i,n){return Le(i,n||{})}function s(i){const n=i.breakpoints||{},u=It(n).filter(a=>t.matchMedia(a).matches).map(a=>n[a]).reduce((a,o)=>e(a,o),{});return e(i,u)}function r(i){return i.map(n=>It(n.breakpoints||{})).reduce((n,u)=>n.concat(u),[]).map(t.matchMedia)}return{mergeOptions:e,optionsAtMedia:s,optionsMediaQueries:r}}function $n(t){let e=[];function s(i,n){return e=n.filter(({options:u})=>t.optionsAtMedia(u).active!==!1),e.forEach(u=>u.init(i,t)),n.reduce((u,a)=>Object.assign(u,{[a.name]:a}),{})}function r(){e=e.filter(i=>i.destroy())}return{init:s,destroy:r}}function $t(t,e,s){const r=t.ownerDocument,c=r.defaultView,i=Fn(c),n=$n(i),u=Mt(),a=Bn(),{mergeOptions:o,optionsAtMedia:m,optionsMediaQueries:l}=i,{on:v,off:h,emit:f}=a,g=I;let d=!1,p,b=o(Nn,$t.globalOptions),x=o(b),w=[],E,L,y;function S(){const{container:D,slides:_}=x;L=(Xt(D)?t.querySelector(D):D)||t.children[0];const B=Xt(_)?L.querySelectorAll(_):_;y=[].slice.call(B||L.children)}function z(D){const _=Pn(t,L,y,r,c,D,a);if(D.loop&&!_.slideLooper.canLoop()){const M=Object.assign({},D,{loop:!1});return z(M)}return _}function k(D,_){d||(b=o(b,D),x=m(b),w=_||w,S(),p=z(x),l([b,...w.map(({options:M})=>M)]).forEach(M=>u.add(M,"change",I)),x.active&&(p.translate.to(p.location.get()),p.animation.init(),p.slidesInView.init(),p.slideFocus.init(U),p.eventHandler.init(U),p.resizeHandler.init(U),p.slidesHandler.init(U),p.options.loop&&p.slideLooper.loop(),L.offsetParent&&y.length&&p.dragHandler.init(U),E=n.init(U,w)))}function I(D,_){const M=Y();O(),k(o({startIndex:M},D),_),a.emit("reInit")}function O(){p.dragHandler.destroy(),p.eventStore.clear(),p.translate.clear(),p.slideLooper.clear(),p.resizeHandler.destroy(),p.slidesHandler.destroy(),p.slidesInView.destroy(),p.animation.destroy(),n.destroy(),u.clear()}function G(){d||(d=!0,u.clear(),O(),a.emit("destroy"),a.clear())}function K(D,_,M){!x.active||d||(p.scrollBody.useBaseFriction().useDuration(_===!0?0:x.duration),p.scrollTo.index(D,M||0))}function j(D){const _=p.index.add(1).get();K(_,D,-1)}function ut(D){const _=p.index.add(-1).get();K(_,D,1)}function ot(){return p.index.add(1).get()!==Y()}function Q(){return p.index.add(-1).get()!==Y()}function Z(){return p.scrollSnapList}function _t(){return p.scrollProgress.get(p.location.get())}function Y(){return p.index.get()}function vt(){return p.indexPrevious.get()}function mt(){return p.slidesInView.get()}function J(){return p.slidesInView.get(!1)}function wt(){return E}function yt(){return p}function R(){return t}function F(){return L}function W(){return y}const U={canScrollNext:ot,canScrollPrev:Q,containerNode:F,internalEngine:yt,destroy:G,off:h,on:v,emit:f,plugins:wt,previousScrollSnap:vt,reInit:g,rootNode:R,scrollNext:j,scrollPrev:ut,scrollProgress:_t,scrollSnapList:Z,scrollTo:K,selectedScrollSnap:Y,slideNodes:W,slidesInView:mt,slidesNotInView:J};return k(e,s),setTimeout(()=>a.emit("init"),0),U}$t.globalOptions=void 0;const On=""+new URL("../assets/hero1.DzMgWea5.webp",import.meta.url).href,Rn=""+new URL("../assets/hero2.BcMtUs81.webp",import.meta.url).href,Vn=""+new URL("../assets/hero3.Cb-_f44p.webp",import.meta.url).href;var Un=rt('<div class="hero-embla__slide svelte-1tzwwl8"><div class="hero-slide-content"><img class="hero-slide-image svelte-1tzwwl8"> <div class="hero-slide-text svelte-1tzwwl8"><h1 class="hero-title svelte-1tzwwl8"> </h1> <p class="hero-subtitle svelte-1tzwwl8"> </p></div></div></div>'),Hn=rt('<div class="hero-carousel svelte-1tzwwl8"><div class="hero-embla__container svelte-1tzwwl8"></div></div> <button class="hero-nav-button hero-prev-button svelte-1tzwwl8" aria-label="Previous Slide">‹</button> <button class="hero-nav-button hero-next-button svelte-1tzwwl8" aria-label="Next Slide">›</button>',1);function Gn(t,e){bt(e,!1);const s=kt(),r=()=>gt(Dt,"$translations",s),c=()=>gt(tn,"$language",s),i=[{image:On,titleKey:"hero_slide1_title",subtitleKey:"hero_slide1_subtitle"},{image:Rn,titleKey:"hero_slide2_title",subtitleKey:"hero_slide2_subtitle"},{image:Vn,titleKey:"hero_slide3_title",subtitleKey:"hero_slide3_subtitle"}];let n,u=nt();Jt(()=>{console.log("Initializing Embla carousel..."),n=$t(N(u),{loop:!0,speed:8}),console.log("Embla instance:",n),et(a,()=>n&&n.scrollNext()),et(o,()=>n&&n.scrollPrev())});let a=nt(()=>{}),o=nt(()=>{});Nt(()=>r(),()=>{console.log("Updated translations:",r())}),Nt(()=>c(),()=>{console.log("Current language:",c())}),Zt(),At();var m=Hn(),l=we(m),v=T(l);te(v,5,()=>i,Wt,(g,d)=>{var p=Un(),b=T(p),x=T(b),w=P(x,2),E=T(w),L=T(E,!0);C(E);var y=P(E,2),S=T(y,!0);C(y),C(w),C(b),C(p),ht(()=>{V(x,"src",N(d).image),V(x,"alt",r()[N(d).titleKey]||"Missing title"),X(L,r()[N(d).titleKey]||"Missing title"),X(S,r()[N(d).subtitleKey]||"Missing subtitle")}),st(g,p)}),C(v),C(l),ye(l,g=>et(u,g),()=>N(u));var h=P(l,2),f=P(h,2);zt("click",h,function(...g){var d;(d=N(o))==null||d.apply(this,g)}),zt("click",f,function(...g){var d;(d=N(a))==null||d.apply(this,g)}),st(t,m),xt()}const Kn=""+new URL("../assets/hotnspicy.BVlXtEud.svg",import.meta.url).href,jn=""+new URL("../assets/spicylemon.BVtmG-vK.svg",import.meta.url).href,Yn=""+new URL("../assets/natural.B4PLw_NC.svg",import.meta.url).href,qn=""+new URL("../assets/lemonpepper.BiVx_e1t.svg",import.meta.url).href;var Xn=rt('<div class="products-embla__slide svelte-1ugw43x"><div class="product svelte-1ugw43x"><img class="product-image svelte-1ugw43x"> <div class="product-info svelte-1ugw43x"><h1 class="flavor svelte-1ugw43x"> </h1> <p class="description svelte-1ugw43x"> </p> <a href="#order-now" class="order-link svelte-1ugw43x">ORDER NOW</a></div></div></div>'),Qn=rt('<div class="products-carousel svelte-1ugw43x"><div class="products-embla__container svelte-1ugw43x"></div></div> <button class="products-nav-button products-prev-button svelte-1ugw43x" aria-label="Previous Slide">‹</button> <button class="products-nav-button products-next-button svelte-1ugw43x" aria-label="Next Slide">›</button>',1);function Zn(t,e){bt(e,!1);const s=kt(),r=()=>gt(Dt,"$translations",s),c=[Yn,qn,jn,Kn];let i,n=nt(),u=nt([]);Jt(()=>{i=$t(N(n),{loop:!0,speed:8}),et(a,()=>i&&i.scrollNext()),et(o,()=>i&&i.scrollPrev())});let a=nt(()=>{}),o=nt(()=>{});Nt(()=>r(),()=>{et(u,r().products||[])}),Zt(),At();var m=Qn(),l=we(m),v=T(l);te(v,5,()=>N(u),Wt,(g,d,p)=>{var b=Xn(),x=T(b),w=T(x),E=P(w,2),L=T(E),y=T(L,!0);C(L);var S=P(L,2),z=T(S,!0);C(S),We(2),C(E),C(x),C(b),ht(()=>{V(w,"src",c[p]),V(w,"alt",N(d).flavor),X(y,N(d).flavor),X(z,N(d).description)}),st(g,b)}),C(v),C(l),ye(l,g=>et(n,g),()=>N(n));var h=P(l,2),f=P(h,2);zt("click",h,function(...g){var d;(d=N(o))==null||d.apply(this,g)}),zt("click",f,function(...g){var d;(d=N(a))==null||d.apply(this,g)}),st(t,m),xt()}const Jn=""+new URL("../assets/map.wClYW2FZ.png",import.meta.url).href;var Wn=rt('<div class="location-container svelte-1d8apym"><h2 class="svelte-1d8apym"> </h2> <p class="svelte-1d8apym"> </p> <img alt="Map showing location" class="map-image svelte-1d8apym"></div>');function ts(t,e){bt(e,!1);const s=kt(),r=()=>gt(Dt,"$translations",s),c=nt();Nt(()=>r(),()=>{et(c,r())}),Zt(),At();var i=Wn(),n=T(i),u=T(n,!0);C(n);var a=P(n,2),o=T(a);C(a);var m=P(a,2);V(m,"src",Jn),C(i),ht(()=>{X(u,r().location_title||"Location"),X(o,`${(r().location_description||"Come visit us at")??""} 
      ${(r().location_address||"8152 Dyer St Suite 8202, El Paso, TX 79904")??""}`)}),st(t,i),xt()}const es=""+new URL("../assets/img1.CPBnN7A4.png",import.meta.url).href,ns=""+new URL("../assets/img2.A4YPzZc1.png",import.meta.url).href,ss=""+new URL("../assets/img3.BzGaoufT.png",import.meta.url).href,rs=""+new URL("../assets/img4.VddDadAo.png",import.meta.url).href,os=""+new URL("../assets/img5.n3UoUTyd.png",import.meta.url).href,is=""+new URL("../assets/img6.DTkjC2jO.png",import.meta.url).href,as=""+new URL("../assets/img7.BCIlS0xb.png",import.meta.url).href,cs=""+new URL("../assets/img8.DgBc16fd.png",import.meta.url).href,ls=""+new URL("../assets/img9.B3Le585f.png",import.meta.url).href;var us=rt('<div class="retailer svelte-6if1fr"><img class="retailer-logo svelte-6if1fr"> <p class="svelte-6if1fr"> </p></div>'),fs=rt('<div class="retailers-container svelte-6if1fr"><h2 class="svelte-6if1fr"> </h2> <div class="retailers-grid svelte-6if1fr"></div></div>');function ds(t,e){bt(e,!1);const s=kt(),r=()=>gt(i,"$title",s);let c=sn(e,"retailers",24,()=>[{name:"El Patron Sports Bar",logo:es},{name:"Time Out Sports Cantina",logo:ns},{name:"Oasis Bar",logo:ss},{name:"Howdy's",logo:rs},{name:"Mercadillo",logo:os},{name:"Zeke's",logo:is},{name:"Good Coffee",logo:as},{name:"El Cuademingo",logo:cs},{name:"Better Time Store",logo:ls}]);const i=rn(Dt,m=>m.retailers_title||"Retailers");At();var n=fs(),u=T(n),a=T(u,!0);C(u);var o=P(u,2);te(o,5,c,Wt,(m,l)=>{var v=us(),h=T(v),f=P(h,2),g=T(f,!0);C(f),C(v),ht(()=>{V(h,"src",N(l).logo),V(h,"alt",N(l).name),X(g,N(l).name)}),st(m,v)}),C(o),C(n),ht(()=>X(a,r())),st(t,n),xt()}const ps="data:image/svg+xml,%3c?xml%20version='1.0'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20width='192px'%20height='192px'%3e%3cpath%20d='M17,3H7C4.791,3,3,4.791,3,7v10c0,2.209,1.791,4,4,4h5.621v-6.961h-2.343v-2.725h2.343V9.309%20c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7%20l-0.351,2.725h-2.365V21H17c2.209,0,4-1.791,4-4V7C21,4.791,19.209,3,17,3z'/%3e%3c/svg%3e",vs="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20width='128px'%20height='128px'%3e%3cpath%20d='M%2021.580078%207%20C%2013.541078%207%207%2013.544938%207%2021.585938%20L%207%2042.417969%20C%207%2050.457969%2013.544938%2057%2021.585938%2057%20L%2042.417969%2057%20C%2050.457969%2057%2057%2050.455062%2057%2042.414062%20L%2057%2021.580078%20C%2057%2013.541078%2050.455062%207%2042.414062%207%20L%2021.580078%207%20z%20M%2047%2015%20C%2048.104%2015%2049%2015.896%2049%2017%20C%2049%2018.104%2048.104%2019%2047%2019%20C%2045.896%2019%2045%2018.104%2045%2017%20C%2045%2015.896%2045.896%2015%2047%2015%20z%20M%2032%2019%20C%2039.17%2019%2045%2024.83%2045%2032%20C%2045%2039.17%2039.169%2045%2032%2045%20C%2024.83%2045%2019%2039.169%2019%2032%20C%2019%2024.831%2024.83%2019%2032%2019%20z%20M%2032%2023%20C%2027.029%2023%2023%2027.029%2023%2032%20C%2023%2036.971%2027.029%2041%2032%2041%20C%2036.971%2041%2041%2036.971%2041%2032%20C%2041%2027.029%2036.971%2023%2032%2023%20z'/%3e%3c/svg%3e",ms="data:image/svg+xml,%3c?xml%20version='1.0'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2050%2050'%20width='100px'%20height='100px'%3e%3cpath%20d='M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z%20M37.006,22.323%20c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527%20s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053%20c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016%20c0.378,3.591,3.277,6.425,6.901,6.685V22.323z'/%3e%3c/svg%3e",gs="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2050%2050'%20width='100px'%20height='100px'%3e%3cpath%20d='M%2014%203.9902344%20C%208.4886661%203.9902344%204%208.4789008%204%2013.990234%20L%204%2035.990234%20C%204%2041.501568%208.4886661%2045.990234%2014%2045.990234%20L%2036%2045.990234%20C%2041.511334%2045.990234%2046%2041.501568%2046%2035.990234%20L%2046%2013.990234%20C%2046%208.4789008%2041.511334%203.9902344%2036%203.9902344%20L%2014%203.9902344%20z%20M%2018.005859%2012.033203%20C%2018.633859%2012.060203%2019.210594%2012.414031%2019.558594%2012.957031%20C%2019.954594%2013.575031%2020.569141%2014.534156%2021.369141%2015.785156%20C%2022.099141%2016.926156%2022.150047%2018.399844%2021.498047%2019.589844%20L%2020.033203%2021.673828%20C%2019.637203%2022.237828%2019.558219%2022.959703%2019.824219%2023.595703%20C%2020.238219%2024.585703%2021.040797%2026.107203%2022.466797%2027.533203%20C%2023.892797%2028.959203%2025.414297%2029.761781%2026.404297%2030.175781%20C%2027.040297%2030.441781%2027.762172%2030.362797%2028.326172%2029.966797%20L%2030.410156%2028.501953%20C%2031.600156%2027.849953%2033.073844%2027.901859%2034.214844%2028.630859%20C%2035.465844%2029.430859%2036.424969%2030.045406%2037.042969%2030.441406%20C%2037.585969%2030.789406%2037.939797%2031.366141%2037.966797%2031.994141%20C%2038.120797%2035.558141%2035.359641%2037.001953%2034.556641%2037.001953%20C%2034.000641%2037.001953%2027.316344%2037.761656%2019.777344%2030.222656%20C%2012.238344%2022.683656%2012.998047%2015.999359%2012.998047%2015.443359%20C%2012.998047%2014.640359%2014.441859%2011.879203%2018.005859%2012.033203%20z'/%3e%3c/svg%3e";var hs=rt('<div class="footer-container container svelte-1ua4zzn"><div class="footer-content row justify-content-center align-items-center"><div class="footer-logo col-12 col-md-3 text-center svelte-1ua4zzn"><img alt="Navarrete El Paso Logo" class="logo-image svelte-1ua4zzn"></div> <div class="footer-icons col-12 col-md-6 d-flex justify-content-center gap-3 svelte-1ua4zzn"><a class="phone-link svelte-1ua4zzn"><img alt="Phone" class="social-icon svelte-1ua4zzn"></a> <a href="https://www.instagram.com" target="_blank" aria-label="Instagram" class="svelte-1ua4zzn"><img alt="Instagram" class="social-icon svelte-1ua4zzn"></a> <a href="https://www.facebook.com" target="_blank" aria-label="Facebook" class="svelte-1ua4zzn"><img alt="Facebook" class="social-icon svelte-1ua4zzn"></a> <a href="https://www.tiktok.com" target="_blank" aria-label="TikTok" class="svelte-1ua4zzn"><img alt="TikTok" class="social-icon svelte-1ua4zzn"></a></div></div> <div class="bulk-order-container text-center svelte-1ua4zzn"><button class="bulk-order-button svelte-1ua4zzn"> </button></div> <div class="footer-copyright text-center svelte-1ua4zzn"><p> </p></div></div>');function bs(t,e){bt(e,!1);const s=kt(),r=()=>gt(Dt,"$translations",s);let c=nt(),i="(915)234-3257";Jt(()=>{et(c,new Date().getFullYear())});function n(){alert("Thank you for considering a bulk order! Please reach out to us directly.")}At();var u=hs(),a=T(u),o=T(a),m=T(o);V(m,"src",en),C(o);var l=P(o,2),v=T(l);V(v,"href",`tel:${i}`);var h=T(v);V(h,"src",gs),C(v);var f=P(v,2),g=T(f);V(g,"src",vs),C(f);var d=P(f,2),p=T(d);V(p,"src",ps),C(d);var b=P(d,2),x=T(b);V(x,"src",ms),C(b),C(l),C(a);var w=P(a,2),E=T(w),L=T(E,!0);C(E),C(w);var y=P(w,2),S=T(y),z=T(S);C(S),C(y),C(u),ht(()=>{X(L,r().footer_bulk_order_button||"Order in Bulk"),X(z,`© ${N(c)??""} ${(r().footer_company_name||"Navarrete El Paso")??""}. ${(r().footer_rights_reserved||"All rights reserved.")??""}`)}),zt("click",E,n),st(t,u),xt()}var xs=rt('<div class="content svelte-3umd3"><section class="hero-section svelte-3umd3" id="hero"><!></section> <section class="products-section svelte-3umd3" id="products"><!></section> <section class="location-section svelte-3umd3" id="location"><!></section> <section class="retailers-section svelte-3umd3" id="retailers"><!></section> <section class="svelte-3umd3"><!></section></div>');function zs(t,e){bt(e,!1);const s=!0;var r=xs(),c=T(r),i=T(c);Gn(i,{}),C(c);var n=P(c,2),u=T(n);Zn(u,{}),C(n);var a=P(n,2),o=T(a);ts(o,{}),C(a);var m=P(a,2),l=T(m);ds(l,{}),C(m);var v=P(m,2),h=T(v);return bs(h,{}),C(v),C(r),st(t,r),nn(e,"prerender",s),xt({prerender:s})}export{zs as component};
