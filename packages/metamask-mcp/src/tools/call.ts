import { FastMCP } from "fastmcp";
import { z } from "zod";
import { call } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { Address, TransactionExecutionError } from "viem";
import { JSONStringify } from "../utils/json-stringify";

export function registerCallTools(server: FastMCP): void {
  server.addTool({
    name: "call",
    description: "Executing a new message call immediately without submitting a transaction to the network",
    parameters: z.object({
      to: z.string(),
      value: z.coerce.number().optional(),
      data: z.string(),
    }),
    execute: async (args) => {
      try {
        const to = args.to as Address
        const value = args.value ? BigInt(args.value) : undefined
        const data = args.data as Address
        const result = await call(wagmiConfig, {
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
