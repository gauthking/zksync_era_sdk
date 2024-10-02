import { Contract, ethers, Wallet } from "ethers";
import { contractDeployerABI } from "./exports";

type Config = {
    deployerAddr: string;
    signerAcc: Wallet
}

export abstract class Base {
    protected deployerAddr: string;
    protected signerAcc: Wallet
    private contract: any;
    protected contractDeployerAddr: string = "0x0000000000000000000000000000000000008006"


    constructor(config: Config) {
        if (!ethers.utils.isAddress(config.deployerAddr)) {
            throw new Error("Invalid Deployer Address")
        }
        this.deployerAddr = config.deployerAddr;
        this.signerAcc = config.signerAcc;
        this.contract = new ethers.Contract(this.contractDeployerAddr, contractDeployerABI, this.signerAcc);
    }
}