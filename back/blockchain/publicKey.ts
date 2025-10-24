import { PublicKey, Keypair } from "@solana/web3.js";
import dotenv from "dotenv"
dotenv.config()

const adminSecret = new Uint8Array(JSON.parse(process.env.SECRET_KEY || ""));
const adminPair = Keypair.fromSecretKey(adminSecret);
console.log("admin key:", adminPair.publicKey.toString());

