import { FastMCP } from "fastmcp";
import { Address, decodeFunctionResult, encodeFunctionData, formatUnits, Hex, parseUnits } from "viem";
import { z } from "zod";
import erc20Abi from "../erc20-abi.js";

export function registerTotalSupplyTools(server: FastMCP): void {
  server.addTool({
    name: "prepare-total-supply",
    description: "Prepare to get total supply of the ERC20 token",
    parameters: z.object({
      tokenAddress: z.string().startsWith("0x"),
    }),
    execute: async (args) => {
      const tokenAddress = args.tokenAddress as Address;
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'totalSupply',
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              prepareForAction: "call",
              address: tokenAddress,
              data,
            })
          }
        ]
      }
    },
  });
  
  server.addTool({
    name: "resolve-total-supply",
    description: "Resolve the result of total supply",
    parameters: z.object({
      tokenDecimal: z.coerce.number(),
      data: z.string().startsWith("0x"),
    }),
    execute: async (args) => {
      const tokenDecimal = args.tokenDecimal;
      const data = args.data as Hex;
      const value = decodeFunctionResult({
        abi: erc20Abi,
        functionName: 'totalSupply',
        data,
      });
      const formatted = formatUnits(value, tokenDecimal);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              formatted,
              value: value.toString(),
            })
          }
        ]
      }
    },
  });


};
