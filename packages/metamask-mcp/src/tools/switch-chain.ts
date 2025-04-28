import { FastMCP } from "fastmcp";
import { z } from "zod";
import { switchChain } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { JSONStringify } from "../utils/json-stringify.js";

export function registerSwitchChainTools(server: FastMCP): void {
  server.addTool({
    name: "switch-chain",
    description: "Switch the target chain",
    parameters: z.object({
      chainId: z.coerce.number(),
      addEthereumChainParameter: z.object({
        chainName: z.string(),
        nativeCurrency: z.object({
          name: z.string(),
          symbol: z.string(),
          decimals: z.coerce.number(),
        }).optional(),
        rpcUrls: z.string().array(),
        blockExplorerUrls: z.string().array().optional(),
        iconUrls: z.string().array().optional(),
      }).optional()
    }),
    execute: async (args) => {
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const addEthereumChainParameter = args.addEthereumChainParameter
      const result = await switchChain(wagmiConfig, {
        chainId,
        addEthereumChainParameter,
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
