import{_,F as c,$ as g,a0 as d,t as p,C as y,a1 as f}from"./xuJhBCKV.js";function w(r,s,o,a){var i=r.__attributes??(r.__attributes={});g&&(i[s]=r.getAttribute(s),s==="src"||s==="srcset"||s==="href"&&r.nodeName==="LINK")||i[s]!==(i[s]=o)&&(s==="style"&&"__styles"in r&&(r.__styles={}),s==="loading"&&(r[_]=o),o==null?r.removeAttribute(s):typeof o!="string"&&e(r).includes(s)?r[s]=o:r.setAttribute(s,o))}var n=new Map;function e(r){var s=n.get(r.nodeName);if(s)return s;n.set(r.nodeName,s=[]);for(var o,a=r,i=Element.prototype;i!==a;){o=d(a);for(var t in o)o[t].set&&s.push(t);a=c(a)}return s}function A(r,s,o){var a=y(r,s);a&&a.set&&(r[s]=o,p(()=>{r[s]=null}))}const v=""+new URL("../assets/logo.7zyAP3kl.svg",import.meta.url).href,N=f("en"),L=f({});export{N as a,A as b,v as l,w as s,L as t};
