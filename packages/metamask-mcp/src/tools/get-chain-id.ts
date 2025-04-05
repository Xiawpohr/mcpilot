import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getChainId } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";

export function registerGetChainIdTools(server: FastMCP): void {
  server.addTool({
    name: "get-chain-id",
    description: "Get the current chain id",
    parameters: z.object({}),
    execute: async () => {
      const result = getChainId(wagmiConfig)
      return {
        content: [
          {
            type: "text",
            text: result.toString(),
          },
        ],
      }
    },
  });
};
