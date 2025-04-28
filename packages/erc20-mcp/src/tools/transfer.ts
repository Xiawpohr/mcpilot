import { FastMCP } from "fastmcp";
import { Address, encodeFunctionData, parseUnits } from "viem";
import { z } from "zod";
import erc20Abi from "../erc20-abi.js";

export function registerTransferTools(server: FastMCP): void {
  server.addTool({
    name: "prepare-transfer",
    description: "Prepare for transfering ERC20 token",
    parameters: z.object({
      tokenAddress: z.string().startsWith("0x"),
      tokenDecimal: z.coerce.number(),
      to: z.string().startsWith("0x"),
      amount: z.coerce.string(),
    }),
    execute: async (args) => {
      const tokenAddress = args.tokenAddress as Address;
      const tokenDecimal = args.tokenDecimal;
      const to = args.to as Address;
      const amount = args.amount;
      
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [
          to,
          parseUnits(amount, tokenDecimal)
        ]
      })

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              prepareForAction: "send-transaction",
              address: tokenAddress,
              data,
            })
          }
        ]
      }
    },
  });
};
