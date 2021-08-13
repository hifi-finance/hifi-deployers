import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { HifiPool__factory } from "@hifi/amm/typechain/factories/HifiPool__factory";
import { HifiPool } from "@hifi/amm/typechain/HifiPool";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

task("deploy:HifiPool")
  .addParam("name", "The ERC-20 name of the pool token")
  .addParam("symbol", "The ERC-20 symbol of the pool token")
  .addParam("hToken", "The address of the hToken contract")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const hifiPoolFactory: HifiPool__factory = new HifiPool__factory(signers[0]);
    const hifiPool: HifiPool = <HifiPool>(
      await hifiPoolFactory.deploy(taskArguments.name, taskArguments.symbol, taskArguments.hToken)
    );
    await hifiPool.deployed();
    console.log("HifiPool deployed to: ", hifiPool.address);
  });
