import { FastMCP } from "fastmcp";
import { z } from "zod";
import solc from "solc";

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

      for (var contractName in output.contracts[fileName]) {
        result.push({
          contractName,
          abi: output.contracts[fileName][contractName].abi,
          bytecode: output.contracts[fileName][contractName].evm.bytecode.object,
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
