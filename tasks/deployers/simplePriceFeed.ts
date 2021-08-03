import { ContractFactory } from "@ethersproject/contracts";
import SimplePriceFeedArtifact from "@hifi/protocol/artifacts/SimplePriceFeed.json";
import { SimplePriceFeed } from "@hifi/protocol/typechain/SimplePriceFeed";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("deploy:StablecoinPriceFeed")
  .addParam("description", "The description of the price feed")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const simplePriceFeedFactory: ContractFactory = new ContractFactory(
      SimplePriceFeedArtifact.abi,
      SimplePriceFeedArtifact.bytecode,
      signers[0],
    );
    const simplePriceFeed: SimplePriceFeed = <SimplePriceFeed>(
      await simplePriceFeedFactory.deploy(taskArguments.description)
    );
    await simplePriceFeed.deployed();
    console.log("SimplePriceFeed deployed to: ", simplePriceFeed.address);
  });
