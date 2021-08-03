import { ContractFactory } from "@ethersproject/contracts";
import BalanceSheetV1Artifact from "@hifi/protocol/artifacts/BalanceSheetV1.json";
import { BalanceSheetV1 } from "@hifi/protocol/typechain/BalanceSheetV1";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("deploy:BalanceSheet")
  .addParam("fintroller", "The address of the Fintroller contract")
  .addParam("oracle", "The address of the oracle contract")
  .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const balanceSheetV1Factory: ContractFactory = new ContractFactory(
      BalanceSheetV1Artifact.abi,
      BalanceSheetV1Artifact.bytecode,
      signers[0],
    );
    const balanceSheet: BalanceSheetV1 = <BalanceSheetV1>(
      await upgrades.deployProxy(balanceSheetV1Factory, [taskArguments.fintroller, taskArguments.oracle])
    );
    await balanceSheet.deployed();
    console.log("BalanceSheet deployed to: ", balanceSheet.address);
  });
