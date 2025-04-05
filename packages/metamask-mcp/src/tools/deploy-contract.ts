import { FastMCP } from "fastmcp";
import { z } from "zod";
import { deployContract } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { Abi, Address, Hex, TransactionExecutionError } from "viem";
import { JSONStringify } from "../utils/json-stringify";

export function registerDeployContractTools(server: FastMCP): void {
  server.addTool({
    name: "deploy-contract",
    description: "Deploy a contract to the network, given bytecode, and constructor arguments",
    parameters: z.object({
      abi: z.string(),
      args: z.string().array(),
      bytecode: z.string(),
    }),
    execute: async (_args) => {
      try {
        const abi = JSON.parse(_args.abi) as Abi
        const args = _args.args
        const bytecode = _args.bytecode as Hex
        const result = await deployContract(wagmiConfig, {
          abi,
          args,
          bytecode,
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
