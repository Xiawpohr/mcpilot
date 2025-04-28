import { FastMCP } from "fastmcp";
import {
  registerAllowanceTools,
  registerApproveTools,
  registerDeployTools,
  registerMintTools,
  registerTotalSupplyTools,
  registerTransferTools,
} from "./tools/index.js";
import { registerGenerateERC20ContractPrompt } from "./prompts/index.js";

const server = new FastMCP({
  name: "Chainlist",
  version: "1.0.0",
});

registerGenerateERC20ContractPrompt(server);

registerAllowanceTools(server);
registerApproveTools(server);
registerDeployTools(server);
registerMintTools(server);
registerTotalSupplyTools(server);
registerTransferTools(server);

async function main() {
  try {
    await server.start({
      transportType: "stdio",
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();
