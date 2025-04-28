import { FastMCP } from "fastmcp";
import { registerVerifyContractTools } from "./tools/index.js";

const server = new FastMCP({
  name: "Celo",
  version: "1.0.0",
});

registerVerifyContractTools(server);


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
