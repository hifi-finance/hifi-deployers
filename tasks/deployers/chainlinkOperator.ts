import { ContractFactory } from "@ethersproject/contracts";
import ChainlinkOperatorArtifact from "@hifi/protocol/artifacts/ChainlinkOperator.json";
import { ChainlinkOperator } from "@hifi/protocol/typechain/ChainlinkOperator";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";

task("deploy:ChainlinkOperator").setAction(async function (_, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const chainlinkOperatorFactory: ContractFactory = new ContractFactory(
    ChainlinkOperatorArtifact.abi,
    ChainlinkOperatorArtifact.bytecode,
    signers[0],
  );
  const chainlinkOperator: ChainlinkOperator = <ChainlinkOperator>await chainlinkOperatorFactory.deploy();
  await chainlinkOperator.deployed();
  console.log("ChainlinkOperator deployed to: ", chainlinkOperator.address);
});
