import * as anchor from "@coral-xyz/anchor";
import { Connection, clusterApiUrl, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import BN from "bn.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import IDL from "./idl/transaction.json" with {type : "json"}

const connection = new Connection(clusterApiUrl("devnet"));

const adminSecret = new Uint8Array(JSON.parse(process.env.SECRET_KEY));
const adminPair = Keypair.fromSecretKey(adminSecret);

const wallet = new anchor.Wallet(adminPair);
const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
anchor.setProvider(provider);

const program = new anchor.Program(IDL, provider);
const programId = program.programId;

export const createSolanaTransaction = async (amount, from, to) => {
    try {
        const transaction_id = nanoid(21);
        const [transactionPda] = PublicKey.findProgramAddressSync(
            [Buffer.from(transaction_id)], 
            programId
        );

        const signature = await program.methods.createTransaction(
            transaction_id, 
            new BN(amount), 
            from, 
            to
        )
        .accounts({
            signer: adminPair.publicKey,
            transaction: transactionPda,
            systemProgram: SystemProgram.programId
        })
        .signers([adminPair])
        .rpc();

        console.log("Signature =", signature);
        return signature;

    } catch (err) {
        console.log("Error in creating solana Transaction:", err);
        throw err;
    }
};