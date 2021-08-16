import "@nomiclabs/hardhat-ethers";

import "./tasks/deploy";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  goerli: 5,
  kovan: 42,
  mainnet: 1,
  "polygon-mainnet": 137,
  rinkeby: 4,
  ropsten: 3,
};

function getEnvVar(key: string): string {
  if (!process.env[key]) {
    throw new Error(`Please set ${key} as an env variable`);
  }
  return process.env[key] || "";
}

// Ensure that we have all the environment variables we need.
const mnemonic: string = getEnvVar("MNEMONIC");
const infuraApiKey: string = getEnvVar("INFURA_API_KEY");

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;
  return {
    accounts: {
      mnemonic,
    },
    chainId: chainIds[network],
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
    },
    localhost: {
      accounts: {
        mnemonic,
      },
      url: "http://localhost:8545",
    },
    goerli: getChainConfig("goerli"),
    kovan: getChainConfig("kovan"),
    "polygon-mainnet": getChainConfig("polygon-mainnet"),
    rinkeby: getChainConfig("rinkeby"),
    ropsten: getChainConfig("ropsten"),
  },
};

export default config;
