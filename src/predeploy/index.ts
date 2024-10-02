import { ethers } from "ethers";
import { Base } from "../base";
import zksync_ethers from "zksync-ethers";


export class PredeployTools extends Base {

    public async isBytecodeDeployed(bytecodeHash: string): Promise<boolean> {
        const code = await this.signerAcc.provider.getCode(this.deployerAddr);
        return code === bytecodeHash;
    }

    public prefetchDeploymentBytecodeHash(contractBytecode: ethers.BytesLike) {
        if (!ethers.utils.isBytesLike(contractBytecode)) {
            throw new Error("Provided Contract Bytecode is not Bytes-Like. Please verify and continue")
        }

        const bytecodeHashRaw: Uint8Array = zksync_ethers.utils.hashBytecode(contractBytecode)

        const bytecodeHash: string = ethers.utils.hexlify(bytecodeHashRaw);

        return bytecodeHash;
    }
}