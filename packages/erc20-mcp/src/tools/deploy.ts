import { FastMCP } from "fastmcp";
import { encodeAbiParameters } from "viem";
import { z } from "zod";
import erc20Abi from "../erc20-abi.js";

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

      const description = erc20Abi.find((x) => 'type' in x && x.type === 'constructor')
      const constructorArguments = description ? encodeAbiParameters(description.inputs, [name, symbol, decimal]) : ""

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              prepareForAction: "deploy-contract",
              abi: erc20Abi,
              args: [name, symbol, decimal],
              bytecode,
              constructorArguments,
            })
          }
        ]
      }
    },
  });
};
