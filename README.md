# MCPilot

> The project is made in ETHGlobal Hackathon Taipie 2025. The project is for proof of concept, and should not be used in production.
> Please check out the [metamask-mcp](https://github.com/Xiawpohr/metamask-mcp) for production ready application.

MCPilot provides a suite of MCP servers that empower LLMs to interact with blockchains through the MetaMask wallet—ensuring users never have to expose their private keys or risk losing their assets. It serves as an essential toolkit for connecting AI with blockchain technology, and also helps streamline user onboarding on chain.

## Description

LLMs are already transforming the way we interact with digital tools. Instead of reading manuals or learning complex systems, we can simply use natural language to ask an LLM to complete tasks for us. This greatly simplifies user onboarding, especially in Web3. With this vision in mind, many Web3 and DeFi agents have already been developed to make decentralized services more accessible and user-friendly.

However, most of these agents share a critical drawback: users are required to share their private keys with the AI agent in order to sign transactions. This poses a significant security risk, as any compromise could result in the loss of a user’s assets.

MCPilot solves this issue by integrating LLMs with MetaMask, one of the most trusted crypto wallets in the ecosystem. This approach ensures that private keys remain securely within the wallet and are never exposed. With MCPilot, users can manage their entire Web3 experience through natural language, with the power of AI—safely and securely.

## Features

- **Blockchain interaction with nature language**

No code, no jargon — just tell the AI what you want to do. From token swaps to bridging to contract signing, “MCPilot” processes plain language and uses many agentic tools to complete your missions.

- **Keep your private key store in a secure crypto wallet**

All transactions are securely signed in the MetaMask mobile app. No need to expose your private key 
or rely on third-party custodians — it stays 100% in your control.

- **Interoperability between Web2 and Web3 services**

MCPilot gives AI capabilities to integrate web2 and web3 services, enabling seamless data flow, smart contract interactions across centralized and decentralized platforms.

## How it's mada

Tech Stack:

- Claude: An AI assistant and chatbot similar to ChatGPT, designed with a strong emphasis on safety and reliability.
- MetaMask: A leading crypto wallet that enables users to interact with the Ethereum blockchain and decentralized applications (dApps) by securely managing their private keys.
- MCP (Model Context Protocol): A protocol designed to simplify and standardize how AI models interact with external data and tools, enabling them to access real-time information beyond their built-in knowledge.

We’ve developed a suite of MCP servers, each offering specialized tools that extend the capabilities of LLMs:

- metamask-mcp: Enables LLMs to interact with MetaMask for secure wallet operations.
- chainlist-mcp: Provides information on all supported blockchain networks.
- solc-mcp: Compiles Solidity smart contracts.
- erc20-mcp: Allows management of ERC20 tokens.
- celo-mcp: Verifies contracts on the Celo blockchain.
- polygon-mcp: Verifies contracts on the Polygon blockchain.
- zircuit-mcp: Supplies token data on the Zircuit blockchain.

## How to use with Claude Desktop

Follow the guide https://modelcontextprotocol.io/quickstart/user and add the following configuration:

```json
{
  "mcpServers": {
    "metamask-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/metamask-mcp/src/index.ts"
      ]
    },
    "chainlist-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/chainlist-mcp/src/index.ts"
      ]
    },
    "solc-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/solc-mcp/src/index.ts"
      ]
    },
    "erc20-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/erc20-mcp/src/index.ts"
      ]
    },
    "polygon-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/polygon-mcp/src/index.ts"
      ],
      "env": {
        "POLYGONSCAN_API_KEY": ""
      }
    },
    "celo-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/celo-mcp/src/index.ts"
      ],
      "env": {
        "CELOSCAN_API_KEY": ""
      }
    },
    "zircuit-server": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/packages/zircuit-mcp/src/index.ts"
      ]
    },
  }
}
```

## Deployed contracts

### Polygon

- Test ERC20 Token: [0x73035CCf7fA8E97cB7F32C6f2E6cCDcF42294A8a](https://amoy.polygonscan.com/address/0x73035CCf7fA8E97cB7F32C6f2E6cCDcF42294A8a#code)

### Celo

- Test ERC20 Token: [0x5c6A2101890195716Ee63aDE4De14A779AE50e0a](https://alfajores.celoscan.io/address/0x5c6a2101890195716ee63ade4de14a779ae50e0a#code)

### Zircuit

- Test ERC20 Token: []()
