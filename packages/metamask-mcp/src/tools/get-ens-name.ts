import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getEnsName} from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { type Address } from "viem";

export function registerGetENSNameTools(server: FastMCP): void {
  server.addTool({
    name: "get-ens-name",
    description: "Get the primary ENS name for address",
    parameters: z.object({
      address: z.string(),
      chainId: z.coerce.number().optional(),
      blockNumber: z.coerce.number().optional(),
    }),
    execute: async (args) => {
      const address = args.address as Address
      const chainId = args.chainId as typeof wagmiConfig['chains'][number]['id']
      const blockNumber = args.blockNumber ? BigInt(args.blockNumber) : undefined
      const result = await getEnsName(wagmiConfig, {
        address,
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
