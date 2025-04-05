import { FastMCP } from "fastmcp";
import { z } from "zod";
import { readContract } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { Abi, Address, TransactionExecutionError } from "viem";

export function registerReadContractTools(server: FastMCP): void {
  server.addTool({
    name: "read-contract",
    description: "Call a read-only function on a contract, and returning the response",
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
        const result = await readContract(wagmiConfig, {
          abi,
          address,
          functionName,
          args,
        })
        return {
          content: [
            {
              type: "text",
              text: `${result}`,
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
