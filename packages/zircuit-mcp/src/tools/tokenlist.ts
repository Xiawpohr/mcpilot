import { FastMCP } from "fastmcp";
import { z } from "zod";

export function registerTokenlistTools(server: FastMCP): void {
  server.addTool({
    name: "get-token-list-on-Zircuit",
    description: "Get a list of tokens on Zircuit mainnet",
    parameters: z.object({}),
    execute: async () => {
      return {
        content: [
          {
            type: "text",
            text: ""
          }
        ]
      }
    },
  });
  
  server.addTool({
    name: "get-token-list-on-garfield-testnet",
    description: "Get a list of tokens on Garfield testnet",
    parameters: z.object({}),
    execute: async () => {
      const tokens = [
        {
          address: "",
          symbole: "",
          decimal: 18,
        },
      ]

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tokens)
          }
        ]
      }
    },
  });
};
