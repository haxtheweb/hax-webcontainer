/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: ``
    },
  },
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