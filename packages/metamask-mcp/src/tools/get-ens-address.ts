import { FastMCP } from "fastmcp";
import { z } from "zod";
import { normalize } from "viem/ens";
import { getEnsAddress } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";

export function registerGetENSAddressTools(server: FastMCP): void {
  server.addTool({
    name: "get-ens-address",
    description: "Get the ENS address for name",
    parameters: z.object({
      name: z.string(),
      chainId: z.coerce.number().optional(),
      blockNumber: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const name = args.name
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const blockNumber = args.blockNumber ? BigInt(args.blockNumber) : undefined
      const result = await getEnsAddress(wagmiConfig, {
        name: normalize(name),
        blockNumber,
        chainId,
      })
      return {
        content: [
          {
            type: "text",
            text: result ?? "undefined",
          },
        ],
      }
    },
  });
};
