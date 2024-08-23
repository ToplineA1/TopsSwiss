const hre = require("hardhat"); 
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const rpcLink = hre.network.config.url;
    const [encryptedData] = await encryptDataField(rpcLink, data);
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {
    const contractAddress = "0x65c174F16555552D52ED28A5C491Fb3bfC2dfb1f";
    const [signer] = await hre.ethers.getSigners();

    const contractFactory = await hre.ethers.getContractFactory("TestToken");
    const contract = contractFactory.attach(contractAddress);

    const functionName = "mint100tokens";
    const mint100tokensTx = await sendShieldedTransaction(
        signer,
        contractAddress,
        contract.interface.encodeFunctionData(functionName), 
        0
    );

    await mint100tokensTx.wait();
    console.log("Transaction Receipt:", mint100tokensTx.hash); 
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
