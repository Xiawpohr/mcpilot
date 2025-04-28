import { http, createConfig, createStorage } from "@wagmi/core";
import { celoAlfajores, mainnet, polygonAmoy, sepolia, zircuitGarfieldTestnet } from "@wagmi/core/chains";
import { kvsMemoryStorage } from "@kvs/memorystorage";

const kvsStorage = await kvsMemoryStorage({
  name: 'wagmi-storage',
  version: 1,
})

const storage = {
  getItem: async (key: string) => {
    const value = await kvsStorage.get(key)
    return value?.toString()
  },
  setItem: async (key: string, value: string) => {
    kvsStorage.set(key, value)
  },
  removeItem: async (key: string) => {
    kvsStorage.delete(key)
  },
}

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygonAmoy, celoAlfajores, zircuitGarfieldTestnet],
  ssr: true,
  storage: createStorage({ storage }), 
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [celoAlfajores.id]: http(),
    [zircuitGarfieldTestnet.id]: http(),
  },
});
