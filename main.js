import "./style.css";
import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";

import { WebContainer } from "@webcontainer/api";
import { files } from "./files";
import { FitAddon } from "@xterm/addon-fit";

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener("load", async () => {

  const fitAddon = new FitAddon();
  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.loadAddon(fitAddon);
  terminal.open(terminalEl);

  fitAddon.fit();
  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);
  await installDependencies();
  await startDevServer();
  // Wait for `server-ready` event
  webcontainerInstance.on("server-ready", (port, url) => {
    iframeEl.src = url;
  });

  const shellProcess = await startShell(terminal);
  window.addEventListener("resize", () => {
    fitAddon.fit();
    shellProcess.resize({
      cols: terminal.cols,
      rows: terminal.rows,
    });
  });
});

async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    }),
  );
  // Wait for install command to exit
  return installProcess.exit;
}

async function startDevServer() {
  // Run `npm run start` to start the Express app
  await webcontainerInstance.spawn("npm", ["run", "start"]);
}

/**
 * @param {Terminal} terminal
 */
async function startShell(terminal) {
  const shellProcess = await webcontainerInstance.spawn("jsh", {
    terminal: {
      cols: terminal.cols,
      rows: terminal.rows,
    },
  });
  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    }),
  );

  const input = shellProcess.input.getWriter();
  terminal.onData((data) => {
    input.write(data);
  });

  return shellProcess;
}

/** @param {string} content*/
async function writeIndexJS(content) {
  await webcontainerInstance.fs.writeFile("/index.js", content);
}

document.querySelector("#app").innerHTML = `
  <div class="container">
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
  <div class="terminal"></div>
`;

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector("iframe");

/** @type {HTMLTextAreaElement | null} */
const terminalEl = document.querySelector(".terminal");
