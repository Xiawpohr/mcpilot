import { FastMCP } from "fastmcp";
import { encodeDeployData } from "viem";
import { z } from "zod";
import erc20Abi from "../erc20-abi";

export function registerDeployTools(server: FastMCP): void {
  server.addTool({
    name: "prepare-deploy-erc20-contract",
    description: "Prepare for deploy a new ERC20 token",
    parameters: z.object({
      bytecode: z.string().startsWith("0x"),
      name: z.string(),
      symbol: z.string(),
      decimal: z.coerce.number(),
    }),
    execute: async (args) => {
      const bytecode = args.bytecode;
      const name = args.name;
      const symbol = args.symbol;
      const decimal = args.decimal;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              prepareForAction: "deploy-contract",
              abi: erc20Abi,
              args: [name, symbol, decimal],
              bytecode,
            })
          }
        ]
      }
    },
  });
};
