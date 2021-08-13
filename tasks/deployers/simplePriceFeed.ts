import { SimplePriceFeed } from "@hifi/protocol/typechain/SimplePriceFeed";
import { SimplePriceFeed__factory } from "@hifi/protocol/typechain/factories/SimplePriceFeed__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("deploy:SimplePriceFeed")
  .addParam("description", "The description of the price feed")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const simplePriceFeedFactory: SimplePriceFeed__factory = new SimplePriceFeed__factory(signers[0]);
    const simplePriceFeed: SimplePriceFeed = <SimplePriceFeed>(
      await simplePriceFeedFactory.deploy(taskArguments.description)
    );
    await simplePriceFeed.deployed();
    console.log("SimplePriceFeed deployed to: ", simplePriceFeed.address);
  });
