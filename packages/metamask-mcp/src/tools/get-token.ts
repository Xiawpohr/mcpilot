import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getToken } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { Address } from "viem";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetTokenTools(server: FastMCP): void {
  server.addTool({
    name: "get-token",
    description: "Get the token information",
    parameters: z.object({
      address: z.string(),
      chainId: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const address = args.address as Address
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const result = await getToken(wagmiConfig, {
        address,
        chainId,
      })
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
