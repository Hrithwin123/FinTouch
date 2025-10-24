import { Connection, Keypair, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Load secret key from env
const secret = Uint8Array.from(JSON.parse(process.env.SECRET_KEY || ""));
const keypair = Keypair.fromSecretKey(secret);

console.log("Wallet public key:", keypair.publicKey.toBase58());

// Connect to devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async () => {
  try {
    // Check balance first
    let balance = await connection.getBalance(keypair.publicKey);
    console.log("Current balance:", balance / LAMPORTS_PER_SOL, "SOL");

    if (balance === 0) {
      console.log("Requesting airdrop of 2 SOL...");
      const sig = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(sig);
      balance = await connection.getBalance(keypair.publicKey);
      console.log("New balance:", balance / LAMPORTS_PER_SOL, "SOL");
    } else {
      console.log("Wallet already funded.");
    }
  } catch (err) {
    console.error("Airdrop error:", err);
  }
})();
