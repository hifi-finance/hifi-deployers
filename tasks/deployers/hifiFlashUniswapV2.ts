import { ContractFactory } from "@ethersproject/contracts";
import HifiFlashUniswapV2Artifact from "@hifi/flash-swap/artifacts/HifiFlashUniswapV2.json";
import { HifiFlashUniswapV2 } from "@hifi/flash-swap/typechain/HifiFlashUniswapV2";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("deploy:HifiFlashUniswapV2")
  .addParam("balanceSheet", "The address of the BalanceSheet contract")
  .addParam("uniswapV2Pair", "The address of the Uniswap V2 pair contract")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const hifiFlashUniswapV2Factory: ContractFactory = new ContractFactory(
      HifiFlashUniswapV2Artifact.abi,
      HifiFlashUniswapV2Artifact.bytecode,
      signers[0],
    );
    const hifiFlashUniswapV2: HifiFlashUniswapV2 = <HifiFlashUniswapV2>(
      await hifiFlashUniswapV2Factory.deploy(taskArguments.balanceSheet, taskArguments.uniswapV2Pair)
    );
    await hifiFlashUniswapV2.deployed();
    console.log("HifiFlashUniswapV2 deployed to: ", hifiFlashUniswapV2.address);
  });
