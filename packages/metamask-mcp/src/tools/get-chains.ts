import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getChains } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetChainsTools(server: FastMCP): void {
  server.addTool({
    name: "get-chains",
    description: "Get the configured chains",
    parameters: z.object({}),
    execute: async () => {
      const result = getChains(wagmiConfig)
      return {
        content: [
          {
            type: "text",
            text: JSONStringify(result),
          },
        ],
      }
    },
  });
};
