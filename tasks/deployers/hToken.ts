import HTokenArtifact from "@hifi/protocol/artifacts/HToken.json";
import { HToken } from "@hifi/protocol/typechain/HToken";
import { ContractFactory } from "@ethersproject/contracts";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

task("deploy:HToken")
  .addParam("name", "The ERC-20 name of the token")
  .addParam("symbol", "The ERC-20 symbol of the token")
  .addParam("maturity", "Unix timestamp in seconds for when this token matures")
  .addParam("balanceSheet", "The address of the BalanceSheet contract")
  .addParam("underlying", "The address of the underlying ERC-20  contract")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const hTokenFactory: ContractFactory = new ContractFactory(HTokenArtifact.abi, HTokenArtifact.bytecode, signers[0]);
    const hToken: HToken = <HToken>(
      await hTokenFactory.deploy(
        taskArguments.name,
        taskArguments.symbol,
        taskArguments.maturity,
        taskArguments.balanceSheet,
        taskArguments.underlying,
      )
    );
    await hToken.deployed();
    console.log("HToken deployed to: ", hToken.address);
  });
