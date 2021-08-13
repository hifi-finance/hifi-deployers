import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { HifiPoolRegistry__factory } from "@hifi/amm/typechain/factories/HifiPoolRegistry__factory";
import { HifiPoolRegistry } from "@hifi/amm/typechain/HifiPoolRegistry";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

task("deploy:HifiPoolRegistry").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const hifiPoolRegistryFactory: HifiPoolRegistry__factory = new HifiPoolRegistry__factory(signers[0]);
  const hifiPoolRegistry: HifiPoolRegistry = <HifiPoolRegistry>await hifiPoolRegistryFactory.deploy();
  await hifiPoolRegistry.deployed();
  console.log("HifiPoolRegistry deployed to: ", hifiPoolRegistry.address);
});
