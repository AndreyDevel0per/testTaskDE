var R=Object.defineProperty;var C=s=>{throw TypeError(s)};var S=(s,t,e)=>t in s?R(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var c=(s,t,e)=>S(s,typeof t!="symbol"?t+"":t,e),P=(s,t,e)=>t.has(s)||C("Cannot "+e);var p=(s,t,e)=>(P(s,t,"read from private field"),e?e.call(s):t.get(s)),l=(s,t,e)=>t.has(s)?C("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),E=(s,t,e,i)=>(P(s,t,"write to private field"),i?i.call(s,e):t.set(s,e),e),y=(s,t,e)=>(P(s,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();var b,g,u;const n=class n{constructor(){return n.instance||(n.instance=this),n.instance}static lock(){E(n,u,!0),document.documentElement.style.setProperty(p(n,b),-1*document.documentElement.scrollTop+"px"),E(n,g,document.documentElement.scrollTop),document.documentElement.classList.add(n.stateClasses.noscroll)}static unlock(){E(n,u,!1),document.documentElement.classList.remove(n.stateClasses.noscroll),window.scrollTo(0,p(n,g)),document.documentElement.style.removeProperty(p(n,b))}get isLocked(){return p(n,u)}};b=new WeakMap,g=new WeakMap,u=new WeakMap,l(n,b,"--st"),l(n,g,0),l(n,u,!1),c(n,"instance"),c(n,"stateClasses",{noscroll:"noscroll"});let v=n;var m,$,D;const d=class d{constructor(){l(this,m);c(this,"attrs",{modal:"data-js-modal",button:"data-js-modal-button",closeButton:"data-js-modal-close"});if(d.instance)return d.instance;this.currentModal=null,y(this,m,D).call(this),d.instance=this}openModal(t){const e=document.querySelector(`[${this.attrs.modal}="${t}"]`);e&&(e.style.display="block",v.lock(),this.currentModal=e)}closeModal(){this.currentModal.style.display="none",v.unlock()}};m=new WeakSet,$=function(t){const{target:e}=t;if(e.hasAttribute(`${this.attrs.button}`)){const o=e.getAttribute(this.attrs.button);this.openModal(o);return}if(e.hasAttribute(this.attrs.closeButton)){const o=e.closest(`[${this.attrs.modal}]`);o&&this.closeModal(o);return}const i=e.closest(`[${this.attrs.modal}]`);i&&e===i&&this.closeModal(i)},D=function(){document.addEventListener("click",t=>{y(this,m,$).call(this,t)})},c(d,"instance");let w=d;var f,N,T;const a=class a{constructor(){l(this,f);c(this,"attrs",{form:"data-js-form"});if(a.instance)return a.instance;y(this,f,T).call(this),this.modalManager=new w,a.instance=this}static getInstance(){return a.instance||(a.instance=new a),a.instance}};f=new WeakSet,N=function(t){const{target:e,submitter:i}=t;if(!e.hasAttribute(`${this.attrs.form}`)||!e.tagName.toLowerCase()==="form")return;const o=JSON.parse(e.getAttribute(this.attrs.form)),{url:r,method:h="POST",showModalAfterSuccess:O,showModalAfterError:j,preventDefault:B=!0,redirectUrlAfterSuccess:M=!1,delayBeforeRedirect:L=!1}=o,I=new FormData(e);B&&t.preventDefault(),i.disabled=!0,fetch(r,{method:h,body:I}).then(q=>{q.ok?O&&(this.modalManager.closeModal(),this.modalManager.openModal(O)):(this.modalManager.closeModal(),this.modalManager.openModal(j)),M&&(L?setTimeout(()=>{location.href=M},L):location.href=M)}).finally(()=>{i.disabled=!1})},T=function(){document.addEventListener("submit",t=>{y(this,f,N).call(this,t)},!0)},c(a,"instance");let A=a;function x(){return new Promise(s=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s()})}Promise.resolve(x()).then(()=>{new A,new w});
