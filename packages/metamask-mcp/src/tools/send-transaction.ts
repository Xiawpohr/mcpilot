import { FastMCP } from "fastmcp";
import { z } from "zod";
import { sendTransaction, SendTransactionErrorType } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { Address, TransactionExecutionError } from "viem";
import { JSONStringify } from "../utils/json-stringify";

export function registerSendTransactionTools(server: FastMCP): void {
  server.addTool({
    name: "send-transaction",
    description: "Send transactions to networks",
    parameters: z.object({
      to: z.string(),
      value: z.coerce.number().optional(),
      data: z.string().optional(),
    }),
    execute: async (args) => {
      try {
        const to = args.to as Address
        const value = args.value ? BigInt(args.value) : undefined
        const data = args.data as Address
        const result = await sendTransaction(wagmiConfig, {
          to,
          value,
          data,
        })
        return {
          content: [
            {
              type: "text",
              text: JSONStringify({
                hash: result
              }),
            },
          ],
        }
      } catch (error) {
        if (error instanceof TransactionExecutionError) {
          return {
            content: [
              {
                type: "text",
                text: error.cause.message,
              }
            ]
          }
        }
        return {
          content: [
            {
              type: "text",
              text: (error as Error).message,
            }
          ]
        }
      }
    },
  });
};
