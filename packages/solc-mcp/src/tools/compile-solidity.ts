import { FastMCP } from "fastmcp";
import { z } from "zod";
import solc from "solc";
// const solc = require("solc")

export function registerCompileSolidityTools(server: FastMCP): void {
  server.addTool({
    name: "compile-solidity",
    description: "Compile the solidity file",
    parameters: z.object({
      fileName: z.string().endsWith(".sol"),
      content: z.string(),
    }),
    execute: async (args, { log }) => {
      const fileName = args.fileName;
      const content = args.content;
      const input = {
        language: 'Solidity',
        sources: {
          [fileName]: {
            content,
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
      // @ts-ignore
      const output = JSON.parse(solc.compile(JSON.stringify(input)));
      const result = []

      for (const contractName in output.contracts[fileName]) {
        const contract = output.contracts[fileName][contractName]
        const metadata = JSON.parse(contract.metadata)

        result.push({
          contractName,
          abi: contract.abi,
          bytecode: contract.evm.bytecode.object,
          compilerVersion: metadata.compiler.version,
        })
      }

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
