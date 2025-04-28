import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getTransaction } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { type Address } from "viem";
import { JSONStringify } from "../utils/json-stringify.js";

export function registerGetTransactionTools(server: FastMCP): void {
  server.addTool({
    name: "get-transaction",
    description: "Get the transactions given hashes or chain identifiers",
    parameters: z.object({
      hash: z.string(),
      chainId: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const hash = args.hash as Address
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const result = await getTransaction(wagmiConfig, {
        hash,
        chainId,
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
