/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
      // try running this to get started:

npx @haxtheweb/haxcms-nodejs

      // awaiting your commands
      // If you want the CLI try running:
      
npx @haxtheweb/create
      
      // This will let you start working with the HAX CLI
      // you can create new web components while we try to
      // debug how we can do full CMS deployment using this method`,
    },
  },
  'package.json': {
    file: {
      contents: `
        {
          "name": "example-app",
          "type": "module",
          "dependencies": {
            "@haxtheweb/haxcms-nodejs": "latest",
            "nodemon": "latest"
          },
          "scripts": {
            "start": "npx @haxtheweb/haxcms-nodejs"
          }
        }`,
    },
  },
};