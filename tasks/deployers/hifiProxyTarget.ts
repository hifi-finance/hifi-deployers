import { ContractFactory } from "@ethersproject/contracts";
import HifiProxyTargetArtifact from "@hifi/proxy-target/artifacts/HifiProxyTarget.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HifiProxyTarget } from "@hifi/proxy-target/typechain/HifiProxyTarget";
import { task } from "hardhat/config";

task("deploy:HifiProxyTarget").setAction(async function (_, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const hifiProxyTargetFactory: ContractFactory = new ContractFactory(
    HifiProxyTargetArtifact.abi,
    HifiProxyTargetArtifact.bytecode,
    signers[0],
  );
  const hifiProxyTarget: HifiProxyTarget = <HifiProxyTarget>await hifiProxyTargetFactory.deploy();
  await hifiProxyTarget.deployed();
  console.log("HifiProxyTarget deployed to: ", hifiProxyTarget.address);
});
