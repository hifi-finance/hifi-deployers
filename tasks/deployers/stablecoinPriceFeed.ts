import { StablecoinPriceFeed } from "@hifi/protocol/typechain/StablecoinPriceFeed";
import { StablecoinPriceFeed__factory } from "@hifi/protocol/typechain/factories/StablecoinPriceFeed__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("deploy:StablecoinPriceFeed")
  .addParam("price", "The immutable price of the stablecoin, with 8 decimals of precision")
  .addParam("description", "The description of the price feed")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const stablecoinPriceFeedFactory: StablecoinPriceFeed__factory = new StablecoinPriceFeed__factory(signers[0]);
    const stablecoinPriceFeed: StablecoinPriceFeed = <StablecoinPriceFeed>(
      await stablecoinPriceFeedFactory.deploy(taskArguments.price, taskArguments.description)
    );
    await stablecoinPriceFeed.deployed();
    console.log("StablecoinPriceFeed deployed to: ", stablecoinPriceFeed.address);
  });
