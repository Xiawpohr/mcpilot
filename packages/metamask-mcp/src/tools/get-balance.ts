import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getBalance } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { JSONStringify } from "../utils/json-stringify.js";
import { type Address } from "viem";

export function registerGetBalanceTools(server: FastMCP): void {
  server.addTool({
    name: "get-native-currency-balance",
    description: "Get the native currency balance of an address",
    parameters: z.object({
      address: z.string()
    }),
    execute: async (args) => {
      const address = args.address as Address
      const result = await getBalance(wagmiConfig, { address })
      return {
        content: [
          {
            type: "text",
            text: JSONStringify(result),
          },
        ],
      }
    },
  });

  server.addTool({
    name: "get-token-balance",
    description: "Get token balance of an address",
    parameters: z.object({
      address: z.string(),
      token: z.string(),
    }),
    execute: async (args) => {
      const address = args.address as Address
      const token = args.token as Address
      const result = await getBalance(wagmiConfig, { address, token })
      return {
        content: [
          {
            type: "text",
            text: JSONStringify(result),
          },
        ],
      }
    },
  });
};
