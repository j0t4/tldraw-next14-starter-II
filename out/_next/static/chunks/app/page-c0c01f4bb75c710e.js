(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7457:function(e,t,n){Promise.resolve().then(n.bind(n,6117))},6117:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var o=n(7437),l=n(9244),i=n(8585);n(7620);let r="http://localhost:5858",c={MainMenu:function(){let e=(0,i.jE2)();return(0,o.jsxs)(i.ilw,{children:[(0,o.jsx)("div",{style:{backgroundColor:"white"},children:(0,o.jsx)(i.KPo,{id:"file",label:"File",children:(0,o.jsxs)(i.loe,{id:"file",children:[(0,o.jsx)(i.hEi,{id:"load",label:"Load File",icon:"external-link",readonlyOk:!0,onSelect:()=>{let t=document.createElement("input");t.type="file",t.onchange=function(n){try{let n=t.files;if(null!==n&&n.length>0){let t=n[0];if(null!==t){let n=new FileReader;n.onload=t=>{if(null!==t.target){let n=t.target.result;null!==n&&(0,i.wd6)(e.store,JSON.parse(n))}},n.readAsText(t)}}}catch(e){console.error(e)}},t.click()}}),(0,o.jsx)(i.hEi,{id:"Save",label:"Save File",icon:"external-link",readonlyOk:!0,onSelect:()=>{let t=(0,i.vMv)(e.store),n=document.createElement("a"),o=new Blob([JSON.stringify(t)],{type:"text/plain"});n.href=URL.createObjectURL(o),n.download="sample.tldr",n.click(),URL.revokeObjectURL(n.href)}})]})})}),(0,o.jsx)(i.L3P,{})]})}},a={async upload(e,t){let n=(0,i.ELf)(),o="".concat(n,"-").concat(t.name),l="".concat(r,"/uploads/").concat(encodeURIComponent(o)),c=await fetch(l,{method:"PUT",body:t});if(!c.ok)throw Error("Failed to upload asset: ".concat(c.statusText));return l},resolve:e=>e.props.src};async function s(e){let{url:t}=e,n={id:i.Ykc.createId((0,i.jKo)(t)),typeName:"asset",type:"bookmark",meta:{},props:{src:t,description:"",image:"",favicon:"",title:""}};try{var o,l,c,a;let e=await fetch("".concat(r,"/unfurl?url=").concat(encodeURIComponent(t))),i=await e.json();n.props.description=null!==(o=null==i?void 0:i.description)&&void 0!==o?o:"",n.props.image=null!==(l=null==i?void 0:i.image)&&void 0!==l?l:"",n.props.favicon=null!==(c=null==i?void 0:i.favicon)&&void 0!==c?c:"",n.props.title=null!==(a=null==i?void 0:i.title)&&void 0!==a?a:""}catch(e){console.error(e)}return n}function d(){let e=(0,l.CO)({uri:"".concat(r,"/connect/").concat("test-room"),assets:a});return(0,o.jsx)("main",{children:(0,o.jsx)("div",{style:{position:"fixed",inset:0},children:(0,o.jsx)(i.DrV,{store:e,onMount:e=>{window.editor=e,e.registerExternalAssetHandler("url",s)},components:c})})})}}},function(e){e.O(0,[941,155,220,971,117,744],function(){return e(e.s=7457)}),_N_E=e.O()}]);