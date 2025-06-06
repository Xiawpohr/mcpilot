import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getAccount } from "@wagmi/core"
import { wagmiConfig } from "../wagmi-config.js";
import { JSONStringify } from "../utils/json-stringify.js";

export function registerWaitSecondsTools(server: FastMCP): void {
  server.addTool({
    name: "wait-seconds",
    description: "Wait the given seconds",
    parameters: z.object({
      seconds: z.coerce.number()
    }),
    execute: async (args) => {
      const seconds = args.seconds
      await wait(seconds * 1000)
      return {
        content: [
          {
            type: "text",
            text: `Wait for ${seconds} seconds`,
          },
        ],
      }
    },
  });
};

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, timeout)
  })
}
