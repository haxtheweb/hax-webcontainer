import "./style.css";
import "@haxtheweb/web-container";
let wc = document.createElement('web-container');
wc.files = {
'package.json': {
  file: {
    contents: `
      {
        "name": "haxcms-demo",
        "type": "module",
        "dependencies": {
          "@haxtheweb/haxcms-nodejs": "latest",
          "@haxtheweb/create": "latest"
        },
        "scripts": {
          "start": "haxcms-nodejs",
          "hax": "hax",
          "haxcms-nodejs":  "haxcms-nodejs"
        }
      }`,
  },
},
};
document.querySelector('#app').appendChild(wc);