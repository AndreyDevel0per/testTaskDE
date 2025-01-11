var D=Object.defineProperty;var P=o=>{throw TypeError(o)};var F=(o,t,e)=>t in o?D(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var u=(o,t,e)=>F(o,typeof t!="symbol"?t+"":t,e),M=(o,t,e)=>t.has(o)||P("Cannot "+e);var h=(o,t,e)=>(M(o,t,"read from private field"),e?e.call(o):t.get(o)),p=(o,t,e)=>t.has(o)?P("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),C=(o,t,e,r)=>(M(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e),l=(o,t,e)=>(M(o,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const v of i.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&r(v)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const c=class c{constructor(){if(c.instance)return c.instance;c.instance=this}validateForm({form:t,isNeedShowErrors:e=!0}){let r=!0;return Array.from(t.elements).forEach(s=>{const i=s.getAttribute(c.attrs.inputRequired);if(!i)return;this.getValidationInput(i,s.value)?this.clearError(s):(r=!1,e&&this.displayError(s,i))}),r}getValidationInput(t,e){switch(t){case"email":return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);case"phone":return/^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(e);case"text":return e.trim().length>0;default:return!0}}displayError(t,e){const r=t.closest(`[${c.attrs.validationContainer}]`);if(!r){console.warn("Не найден контейнер для отображения ошибок для элемента",t);return}let s=r.querySelector(`[${c.attrs.errorMsg}]`);s||(s=document.createElement("div"),s.setAttribute(c.attrs.errorMsg,""),r.appendChild(s)),s.textContent=`Поле ${e} заполнено некорректно`,r.classList.add(c.stateClasses.error)}clearError(t){const e=t.closest(`[${c.attrs.validationContainer}]`);if(!e)return;const r=e.querySelector(`[${c.attrs.errorMsg}]`);r&&(r.textContent=""),e.classList.remove(c.stateClasses.error)}};u(c,"attrs",{inputRequired:"data-js-input-required",validationContainer:"data-js-validation-container",errorMsg:"data-js-validation-error-message"}),u(c,"stateClasses",{error:"error"});let L=c;var y,b,m;const n=class n{constructor(){return n.instance||(n.instance=this),n.instance}set isLocked(t){t!==h(n,m)&&(t?(C(n,m,!0),document.documentElement.style.setProperty(h(n,y),-1*document.documentElement.scrollTop+"px"),C(n,b,document.documentElement.scrollTop),document.documentElement.classList.add(n.stateClasses.noscroll)):(C(n,m,!1),document.documentElement.classList.remove(n.stateClasses.noscroll),window.scrollTo(0,h(n,b)),document.documentElement.style.removeProperty(h(n,y))))}get isLocked(){return h(n,m)}};y=new WeakMap,b=new WeakMap,m=new WeakMap,p(n,y,"--st"),p(n,b,0),p(n,m,!1),u(n,"instance"),u(n,"stateClasses",{noscroll:"noscroll"});let w=n;var g,j,q;const d=class d{constructor(){p(this,g);u(this,"attrs",{modal:"data-js-modal",button:"data-js-modal-button",closeButton:"data-js-modal-close"});if(d.instance)return d.instance;this.currentModal=null,l(this,g,q).call(this),this.scrollLockManager=new w,d.instance=this}openModal(t){const e=document.querySelector(`[${this.attrs.modal}="${t}"]`);e&&(e.classList.replace(d.stateClasses.close,d.stateClasses.open),this.scrollLockManager.isLocked=!0,this.currentModal=e)}closeModal(){this.currentModal.classList.replace(d.stateClasses.open,d.stateClasses.close),this.scrollLockManager.isLocked=!1}};g=new WeakSet,j=function(t){const{target:e}=t;if(e.hasAttribute(`${this.attrs.button}`)){const s=e.getAttribute(this.attrs.button);this.openModal(s);return}if(e.hasAttribute(this.attrs.closeButton)){const s=e.closest(`[${this.attrs.modal}]`);s&&this.closeModal(s);return}const r=e.closest(`[${this.attrs.modal}]`);r&&e===r&&this.closeModal(r)},q=function(){document.addEventListener("click",t=>{l(this,g,j).call(this,t)})},u(d,"instance"),u(d,"stateClasses",{open:"visible",close:"hidden"});let E=d;var a,O,V,T,x,$,I,N,S;const f=class f{constructor(){p(this,a);u(this,"attrs",{form:"data-js-form",needValidation:"data-js-form-validation-required"});if(f.instance)return f.instance;l(this,a,S).call(this),this.modalManager=new E,this.formValidator=new L,f.instance=this}static getInstance(){return f.instance||(f.instance=new f),f.instance}};a=new WeakSet,O=function(t){return JSON.parse(t.getAttribute(this.attrs.form))||{}},V=function(t){return this.formValidator.validateForm({form:t})},T=async function(t,e){const{url:r,method:s="POST"}=t;return fetch(r,{method:s,body:e})},x=function(t,e){const{showModalAfterSuccess:r,redirectUrlAfterSuccess:s,delayBeforeRedirect:i}=t;e.reset(),r&&(this.modalManager.closeModal(),this.modalManager.openModal(r)),s&&l(this,a,I).call(this,s,i)},$=function(t){t.showModalAfterError&&(this.modalManager.closeModal(),this.modalManager.openModal(t.showModalAfterError))},I=function(t,e){e?setTimeout(()=>{location.href=t},e):location.href=t},N=function(t){const{target:e,submitter:r}=t;if(!e.hasAttribute(`${this.attrs.form}`)||!e.tagName.toLowerCase()==="form")return;const s=l(this,a,O).call(this,e);s.isAjaxForm&&t.preventDefault(),!(e.hasAttribute(this.attrs.needValidation)&&!l(this,a,V).call(this,e))&&(r.disabled=!0,l(this,a,T).call(this,s,new FormData(e)).then(i=>i.ok?l(this,a,x).call(this,s,e):l(this,a,$).call(this,s)).catch(i=>{console.error(i),l(this,a,$).call(this,s)}).finally(()=>{r.disabled=!1}))},S=function(){document.addEventListener("submit",t=>{l(this,a,N).call(this,t)},!0)},u(f,"instance");let A=f;function R(){return new Promise(o=>{document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o):o()})}Promise.resolve(R()).then(()=>{new A,new E});
