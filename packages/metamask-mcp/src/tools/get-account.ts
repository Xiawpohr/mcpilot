import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getAccount } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { JSONStringify } from "../utils/json-stringify.js";

export function registerGetAccountTools(server: FastMCP): void {
  server.addTool({
    name: "get-account",
    description: "Get current account",
    parameters: z.object({}),
    execute: async () => {
      const result = getAccount(wagmiConfig)
      return {
        content: [
          {
            type: "text",
            text: JSONStringify({
              address: result.address,
              addresses: result.addresses,
              chainId: result.chainId,
              status: result.status,
            }),
          },
        ],
      }
    },
  });
};
