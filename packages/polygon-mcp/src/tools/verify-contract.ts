import { FastMCP } from "fastmcp";
import { z } from "zod";
import { EtherscanVerifier } from "../utils/EtherscanVerifier.js";
import env from "../env.js";

export function registerVerifyContractTools(server: FastMCP): void {
  server.addTool({
    name: "verify-contract-on-polygon-mainnet",
    description: "Submits a contract source code to PolygonScan for verification.",
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

      const verifier = new EtherscanVerifier(env.POLYGONSCAN_API_KEY, "https://api.polygonscan.com/api", "https://polygonscan.com/");
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
    name: "verify-contract-on-amoy-testnet",
    description: "Submits a contract source code to amoy PolygonScan for verification.",
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

      const verifier = new EtherscanVerifier(env.POLYGONSCAN_API_KEY, "https://api-amoy.polygonscan.com/api", "https://amoy.polygonscan.com/");
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
