const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

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
  const replace_contractAddress = "0x65c174F16555552D52ED28A5C491Fb3bfC2dfb1f"; // Replace with your actual contract address
  const [signer] = await hre.ethers.getSigners();

  const replace_contractFactory = await hre.ethers.getContractFactory("TestToken");
  const contract = replace_contractFactory.attach(replace_contractAddress);

  const replace_functionName = "transfer";
  const replace_functionArgs = [
    "0x83e5267495d3148476d52b964402635fb8939c2c", // Replace with the recipient address
    "1" // Amount of tokens to transfer
  ];

  const transaction = await sendShieldedTransaction(
    signer,
    replace_contractAddress,
    contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs),
    0
  );

  await transaction.wait();
  console.log("Transaction Response: https://explorer-evm.testnet.swisstronik.com/tx/" + transaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
