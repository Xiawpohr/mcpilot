import { FastMCP } from "fastmcp";
import { Address, decodeFunctionResult, encodeFunctionData, formatUnits, Hex, parseUnits } from "viem";
import { z } from "zod";
import erc20Abi from "../erc20-abi.js";

export function registerAllowanceTools(server: FastMCP): void {
  server.addTool({
    name: "prepare-allowance",
    description: "Prepare to get allowance of the ERC20 token",
    parameters: z.object({
      tokenAddress: z.string().startsWith("0x"),
      owner: z.string().startsWith("0x"),
      spender: z.string().startsWith("0x"),
    }),
    execute: async (args) => {
      const tokenAddress = args.tokenAddress as Address;
      const owner = args.owner as Address;
      const spender = args.spender as Address;
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'allowance',
        args: [
          owner,
          spender,
        ]
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
    name: "resolve-allowance",
    description: "Resolve the result of allowance",
    parameters: z.object({
      tokenDecimal: z.coerce.number(),
      data: z.string().startsWith("0x"),
    }),
    execute: async (args) => {
      const tokenDecimal = args.tokenDecimal;
      const data = args.data as Hex;
      const value = decodeFunctionResult({
        abi: erc20Abi,
        functionName: 'allowance',
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
