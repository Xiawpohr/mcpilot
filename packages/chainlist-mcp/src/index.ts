import { FastMCP } from "fastmcp";
import { registerChainlistTools } from "./tools";

const server = new FastMCP({
  name: "Chainlist",
  version: "1.0.0",
});

registerChainlistTools(server);


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
