import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getGasPrice } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";

export function registerGetGasPriceTools(server: FastMCP): void {
  server.addTool({
    name: "get-gas-price",
    description: "Get the current price of gas (in wei)",
    parameters: z.object({
      chainId: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const result = await getGasPrice(wagmiConfig, {
        chainId,
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
