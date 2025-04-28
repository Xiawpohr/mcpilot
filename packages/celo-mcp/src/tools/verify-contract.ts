import { FastMCP } from "fastmcp";
import { z } from "zod";
import { EtherscanVerifier } from "../utils/EtherscanVerifier.js";
import env from "../env.js";

export function registerVerifyContractTools(server: FastMCP): void {
  server.addTool({
    name: "verify-contract-on-Celo-mainnet",
    description: "Submits a contract source code to Celoscan for verification.",
    parameters: z.object({
      contractAddress: z.string().startsWith("0x"),
      sourceCode: z.string(),
      contractName: z.string(),
      compilerVersion: z.string(),
      constructorArguments: z.string(),
    }),
    execute: async (args) => {
      const {
        contractAddress,
        sourceCode,
        contractName,
        compilerVersion,
        constructorArguments,
      } = args;

      const verifier = new EtherscanVerifier(env.CELOSCAN_API_KEY, "https://api.celoscan.io/", "https://celoscan.io/");
      const result = await verifier.verify(
        contractAddress,
        sourceCode,
        contractName,
        `v${compilerVersion}`,
        constructorArguments?.replace("0x", "") ?? ""
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      }
    },
  });
  
  server.addTool({
    name: "verify-contract-on-Alfajores-testnet",
    description: "Submits a contract source code to Alfajores Celoscan for verification.",
    parameters: z.object({
      contractAddress: z.string().startsWith("0x"),
      sourceCode: z.string(),
      contractName: z.string(),
      compilerVersion: z.string(),
      constructorArguments: z.string(),
    }),
    execute: async (args) => {
      const {
        contractAddress,
        sourceCode,
        contractName,
        compilerVersion,
        constructorArguments,
      } = args;

      const verifier = new EtherscanVerifier(env.CELOSCAN_API_KEY, "https://api-alfajores.celoscan.io/api", "https://alfajores.celoscan.io/");
      const result = await verifier.verify(
        contractAddress,
        sourceCode,
        contractName,
        `v${compilerVersion}`,
        constructorArguments?.replace("0x", "") ?? ""
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      }
    },
  });

  
};
