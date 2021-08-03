import { ContractFactory } from "@ethersproject/contracts";
import FintrollerV1Artifact from "@hifi/protocol/artifacts/FintrollerV1.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { FintrollerV1 } from "@hifi/protocol/typechain/FintrollerV1";
import { upgrades } from "hardhat";
import { task } from "hardhat/config";

task("deploy:Fintroller").setAction(async function (_, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const fintrollerV1Factory: ContractFactory = new ContractFactory(
    FintrollerV1Artifact.abi,
    FintrollerV1Artifact.bytecode,
    signers[0],
  );
  const fintroller: FintrollerV1 = <FintrollerV1>await upgrades.deployProxy(fintrollerV1Factory);
  await fintroller.deployed();
  console.log("Fintroller deployed to: ", fintroller.address);
});
