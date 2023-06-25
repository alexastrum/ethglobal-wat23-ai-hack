import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
// import { hexToBytes } from "./Utils";
import "./Environment";

export default async function createClient(): Promise<Client> {
  let wallet: Wallet;
  const key = process.env.KEY;

  if (key) {
    wallet = new Wallet(key);
  } else {
    wallet = Wallet.createRandom() as any as Wallet;
  }

  if (process.env.XMTP_ENV !== "production" && process.env.XMTP_ENV !== "dev") {
    throw "invalid XMTP env";
  }

  const client = await Client.create(wallet, {
    env: process.env.XMTP_ENV || "production",
  });

  await client.publishUserContact();

  return client;
}
