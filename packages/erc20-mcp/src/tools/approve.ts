import { FastMCP } from "fastmcp";
import { Address, encodeFunctionData, parseUnits } from "viem";
import { z } from "zod";
import erc20Abi from "../erc20-abi.js";

export function registerApproveTools(server: FastMCP): void {
  server.addTool({
    name: "prepare-approve",
    description: "Prepare for approving someone to spend ERC20 token",
    parameters: z.object({
      tokenAddress: z.string().startsWith("0x"),
      tokenDecimal: z.coerce.number(),
      spender: z.string().startsWith("0x"),
      amount: z.coerce.string(),
    }),
    execute: async (args) => {
      const tokenAddress = args.tokenAddress as Address;
      const tokenDecimal = args.tokenDecimal;
      const spender = args.spender as Address;
      const amount = args.amount;
      
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [
          spender,
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
