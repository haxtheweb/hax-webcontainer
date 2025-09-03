import "./style.css";
import "@haxtheweb/web-container/lib/web-container-wc-registry-docs.js";
let wc = document.createElement('web-container-wc-registry-docs');
wc.text = 'Select the project to produce a demo for and doc player will make a best attempt at loading. Most elements should load from the registry but some only make sense in a large application context. To learn more about loading registry elements anywhere see the "Magic" link.';
document.querySelector('#app').appendChild(wc);