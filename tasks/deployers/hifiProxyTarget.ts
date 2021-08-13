import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HifiProxyTarget } from "@hifi/proxy-target/typechain/HifiProxyTarget";
import { HifiProxyTarget__factory } from "@hifi/proxy-target/typechain/factories/HifiProxyTarget__factory";
import { task } from "hardhat/config";

task("deploy:HifiProxyTarget").setAction(async function (_, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const hifiProxyTargetFactory: HifiProxyTarget__factory = new HifiProxyTarget__factory(signers[0]);
  const hifiProxyTarget: HifiProxyTarget = <HifiProxyTarget>await hifiProxyTargetFactory.deploy();
  await hifiProxyTarget.deployed();
  console.log("HifiProxyTarget deployed to: ", hifiProxyTarget.address);
});
