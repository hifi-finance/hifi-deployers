import { ContractFactory } from "@ethersproject/contracts";
import HifiPoolRegistryArtifact from "@hifi/amm/artifacts/HifiPoolRegistry.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HifiPoolRegistry } from "@hifi/amm/typechain/HifiPoolRegistry";
import { task } from "hardhat/config";

task("deploy:HifiPoolRegistry ").setAction(async function (_, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const hifiPoolRegistryFactory: ContractFactory = new ContractFactory(
    HifiPoolRegistryArtifact.abi,
    HifiPoolRegistryArtifact.bytecode,
    signers[0],
  );
  const hifiPoolRegistry: HifiPoolRegistry = <HifiPoolRegistry>await hifiPoolRegistryFactory.deploy();
  await hifiPoolRegistry.deployed();
  console.log("HifiPoolRegistry deployed to: ", hifiPoolRegistry.address);
});
