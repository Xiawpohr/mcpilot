import { FastMCP } from "fastmcp";
import { z } from "zod";
import { verifyMessage } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { Address } from "viem";

export function registerVerifyMessageTools(server: FastMCP): void {
  server.addTool({
    name: "verify-message",
    description: "Verify that a message was signed by the provided address",
    parameters: z.object({
      address: z.string(),
      message: z.string(),
      signature: z.string(),
    }),
    execute: async (args) => {
      const address = args.address as Address
      const message = args.message
      const signature = args.signature as `0x${string}`
      const result = await verifyMessage(wagmiConfig, {
        address,
        message,
        signature,
      })
      return {
        content: [
          {
            type: "text",
            text: result.toString(),
          },
        ],
      }
    },
  });
};
