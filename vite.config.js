import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import contactHandler from "./api/contact.js";

const VITE_CLIENT_PATH = new URL(
  "./node_modules/vite/dist/client/client.mjs",
  import.meta.url,
);

const toJsValue = (value) => JSON.stringify(value ?? "");
const replaceLiteral = (code, search, value) => code.split(search).join(value);

const getDevHost = (serverConfig) => {
  if (typeof serverConfig.host === "string") {
    return serverConfig.host;
  }

  return "localhost";
};

const buildViteClientScript = async (config) => {
  const base = config.base || "/";
  const hmr = config.server.hmr || {};
  const host = getDevHost(config.server);
  const port = config.server.port || 5173;
  const hmrPort = hmr.clientPort || hmr.port || null;
  const hmrProtocol = hmr.protocol || null;
  const hmrHost = hmr.host || null;
  const hmrBase = hmr.path || base;
  const directTarget = `${host}:${hmr.port || port}${hmrBase}`;
  const configName = config.configFile
    ? basename(config.configFile)
    : "vite.config.js";

  let code = await readFile(VITE_CLIENT_PATH, "utf8");
  code = replaceLiteral(
    code,
    "import '@vite/env';",
    'import "/node_modules/vite/dist/client/env.mjs";',
  );

  const replacements = {
    __BASE__: toJsValue(base),
    __SERVER_HOST__: toJsValue(`${host}:${port}${base}`),
    __HMR_PROTOCOL__: toJsValue(hmrProtocol),
    __HMR_HOSTNAME__: toJsValue(hmrHost),
    __HMR_PORT__: toJsValue(hmrPort),
    __HMR_DIRECT_TARGET__: toJsValue(directTarget),
    __HMR_BASE__: toJsValue(hmrBase),
    __HMR_TIMEOUT__: String(hmr.timeout || 30000),
    __HMR_ENABLE_OVERLAY__: String(hmr.overlay !== false),
    __HMR_CONFIG_NAME__: toJsValue(configName),
    __WS_TOKEN__: toJsValue(config.webSocketToken),
  };

  for (const [search, value] of Object.entries(replacements)) {
    code = replaceLiteral(code, search, value);
  }

  return code;
};

const readRequestBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const createLocalApiResponse = (response) => ({
  setHeader: (name, value) => response.setHeader(name, value),
  status(statusCode) {
    response.statusCode = statusCode;
    return this;
  },
  json(payload) {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(payload));
    return this;
  },
});

const localContactApiPlugin = () => ({
  name: "local-contact-api",
  configureServer(server) {
    server.middlewares.use("/api/contact", async (request, response) => {
      const body = await readRequestBody(request);

      await contactHandler(
        {
          method: request.method,
          headers: request.headers,
          body,
        },
        createLocalApiResponse(response),
      );
    });
  },
});

const patchedViteClientPlugin = () => ({
  name: "patched-vite-client-ws-token",
  configureServer(server) {
    server.middlewares.use("/@vite/client", async (_request, response) => {
      const code = await buildViteClientScript(server.config);

      response.setHeader("Content-Type", "application/javascript");
      response.setHeader("Cache-Control", "no-cache");
      response.end(code);
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [patchedViteClientPlugin(), react(), localContactApiPlugin()],
});
