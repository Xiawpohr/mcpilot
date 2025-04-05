import { FastMCP } from "fastmcp";
import {
  registerCallTools,
  registerConnectTools,
  registerDeployContractTools,
  registerDisconnectTools,
  registerGetAccountTools,
  registerGetBalanceTools,
  registerGetBlockNumberTools,
  registerGetBlockTools,
  registerGetChainIdTools,
  registerGetChainsTools,
  registerGetENSAddressTools,
  registerGetENSNameTools,
  registerGetTokenTools,
  registerGetTransactionReceiptTools,
  registerGetTransactionTools,
  registerReadContractTools,
  registerSendTransactionTools,
  registerSignMessageTools,
  registerSwitchChainTools,
  registerVerifyMessageTools,
  registerWaitForTransactionReceiptTools,
  registerWaitSecondsTools,
  registerWriteContractTools,
} from './tools';
import { registerBeMetaMaskAssistantPrompt } from "./prompts";


const server = new FastMCP({
  name: "MetaMask",
  version: "1.0.0",
});

// prompts
registerBeMetaMaskAssistantPrompt(server);

// tools
registerCallTools(server);
registerConnectTools(server);
registerDeployContractTools(server);
registerDisconnectTools(server);
registerGetAccountTools(server);
registerGetBalanceTools(server);
registerGetBlockNumberTools(server);
registerGetBlockTools(server);
registerGetChainIdTools(server);
registerGetChainsTools(server);
registerGetENSAddressTools(server);
registerGetENSNameTools(server);
registerGetTokenTools(server);
registerGetTransactionReceiptTools(server);
registerGetTransactionTools(server);
registerReadContractTools(server);
registerSendTransactionTools(server);
registerSignMessageTools(server);
registerSwitchChainTools(server);
registerVerifyMessageTools(server);
registerWaitForTransactionReceiptTools(server);
registerWaitSecondsTools(server);
registerWriteContractTools(server);


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
