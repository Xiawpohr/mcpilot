import { FastMCP } from "fastmcp";
import { z } from "zod";
import { waitForTransactionReceipt } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { type Address } from "viem";
import { JSONStringify } from "../utils/json-stringify.js";

export function registerWaitForTransactionReceiptTools(server: FastMCP): void {
  server.addTool({
    name: "wait-for-transaction-receipt",
    description: "Waits for the transaction to be included on a block, and then returns the transaction receipt",
    parameters: z.object({
      hash: z.string(),
      chainId: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      try {
        const hash = args.hash as Address
        const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
        const result = await waitForTransactionReceipt(wagmiConfig, {
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
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: (error as Error).message,
            },
          ],
        }
      }
    },
  });
};
