import "./style.css";
import "@haxtheweb/web-container/lib/web-container-doc-player.js";
// listen for user selection on the input field;
const select = globalThis.document.querySelector('#select');
  
fetch(`https://cdn.hax.cloud/cdn/wc-registry.json`).then(d => d.json()).then(data => {
  let obj = Object.fromEntries(Object.entries(data).filter(([key, value]) => value.includes('@haxtheweb/') && !key.startsWith('hax')));
  Object.keys(obj).forEach(path => {
    let el = globalThis.document.createElement('option');
    el.value = path;
    el.innerText = path;
    select.appendChild(el);
  });
  globalThis.filteredWcRegistry = obj;
});
select.addEventListener('change', async (e) => {
  if (select.value) {
    let wcm = await globalThis.WebContainerManager.requestAvailability();
    let wcdp = globalThis.document.createElement('web-container-doc-player');
    let ary = globalThis.filteredWcRegistry[select.value].split('/');
    wcdp.project = globalThis.filteredWcRegistry[select.value] = `${ary.shift()}/${ary.shift()}`;
    wcdp.element = select.value;
    wcdp.importpath = globalThis.filteredWcRegistry[select.value];
    let container = globalThis.document.querySelector('#container');
    container.innerHTML = '';
    container.appendChild(wcdp);
  }
})