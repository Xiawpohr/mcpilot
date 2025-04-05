import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getBlockNumber } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";

export function registerGetBlockNumberTools(server: FastMCP): void {
  server.addTool({
    name: "get-block-number",
    description: "Get the block nunber of a chain",
    parameters: z.object({
      chainId: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const result = await getBlockNumber(wagmiConfig, {
        chainId,
      })
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
