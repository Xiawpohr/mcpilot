import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getBlock } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetBlockTools(server: FastMCP): void {
  server.addTool({
    name: "get-block",
    description: "Get the block information of a chain",
    parameters: z.object({
      chainId: z.coerce.number().optional(),
      blockNumber: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const blockNumber = args.blockNumber ? BigInt(args.blockNumber) : undefined
      const result = await getBlock(wagmiConfig, {
        blockNumber,
        chainId,
        includeTransactions: false
      })
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
