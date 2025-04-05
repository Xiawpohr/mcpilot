import { FastMCP } from "fastmcp";
import { z } from "zod";
import { signMessage } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config";
import { JSONStringify } from "../utils/json-stringify";

export function registerSignMessageTools(server: FastMCP): void {
  server.addTool({
    name: "sign-message",
    description: "Sign messages",
    parameters: z.object({
      message: z.string(),
    }),
    execute: async (args, { log }) => {
      try {
        const message = args.message
        const result = await signMessage(wagmiConfig, {
          message
        })
        return {
          content: [
            {
              type: "text",
              text: JSONStringify({
                hash: result
              }),
            },
          ],
        }
      } catch (error) {
        log.debug((error as Error).message)
        throw error;
      }
    },
  });
};
