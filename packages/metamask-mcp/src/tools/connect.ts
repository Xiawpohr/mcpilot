import { FastMCP, imageContent } from "fastmcp";
import { z } from "zod";
import QRCode from "qrcode";
import { connect } from "@wagmi/core"
import { metaMask } from "@wagmi/connectors";
import { wagmiConfig } from "../wagmi-config";
import { JSONStringify } from "../utils/json-stringify";

export function registerConnectTools(server: FastMCP): void {
  server.addTool({
    name: "get-connect-uri",
    description: "Get the connect URI to connect to a MetaMask wallet",
    parameters: z.object({}),
    execute: async (_, { log }) => {
      const uri = await getMetaMaskConnectURI(log);
      return {
        content: [
          {
            type: "text",
            text: JSONStringify({
              uri,
            }),
          },
        ],
      }
    },
  });

  server.addTool({
    name: "show-connect-qrcode",
    description: "Show the connect QR code for a given connect URI",
    parameters: z.object({
      uri: z.string(),
    }),
    execute: async (args) => {
      const uri = args.uri;
      const qrCode = await QRCode.toDataURL(uri);
      return imageContent({
        url: qrCode,
      })
    },
  });
};

async function getMetaMaskConnectURI(log: any) {
  return new Promise((resolve, reject) => {
    const connectorFn = metaMask({
      headless: true,
    });
    const connector = wagmiConfig._internal.connectors.setup(connectorFn)
    connector.emitter.on("message", (payload) => {
      if (payload.type === "display_uri") {
        const uri = payload.data
        resolve(uri)
      }
    });
    connector.emitter.on("connect", (payload) => {
      log.debug("connect success!", payload.accounts)
    })
    connector.emitter.on("error", (payload) => {
      log.error(payload.error)
    })

    connect(wagmiConfig, { connector })
      .catch((error) => {
        log.error("connect error: ", error)
        reject(error)
      })
  })
}
