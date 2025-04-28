import { FastMCP } from "fastmcp";
import { registerTokenlistTools } from "./tools/index.js";

const server = new FastMCP({
  name: "Chainlist",
  version: "1.0.0",
});

registerTokenlistTools(server);

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
