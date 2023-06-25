import { Wallet } from "ethers";

const key = Wallet.createRandom().privateKey;
console.log("Set your environment variable: KEY=" + key);
