import { FastMCP } from "fastmcp";
import { z } from "zod";
import { writeContract } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { Abi, Address, TransactionExecutionError } from "viem";
import { JSONStringify } from "../utils/json-stringify.js";

export function registerWriteContractTools(server: FastMCP): void {
  server.addTool({
    name: "write-contract",
    description: "Execute a write function on a contract",
    parameters: z.object({
      abi: z.string(),
      address: z.string(),
      functionName: z.string(),
      args: z.string().array()
    }),
    execute: async (_args) => {
      try {
        const abi = JSON.parse(_args.abi) as Abi
        const address = _args.abi as Address
        const functionName = _args.functionName
        const args = _args.args
        const result = await writeContract(wagmiConfig, {
          abi,
          address,
          functionName,
          args,
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
