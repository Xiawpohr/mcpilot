import { FastMCP } from "fastmcp";
import { z } from "zod";
import { disconnect } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";

export function registerDisconnectTools(server: FastMCP): void {
  server.addTool({
    name: "disconnect",
    description: "Disconnect the metamaks wallet",
    parameters: z.object({}),
    execute: async () => {
      await disconnect(wagmiConfig)
      return {
        content: [
          {
            type: "text",
            text: "Disconnect successfully",
          },
        ],
      }
    },
  });
};
