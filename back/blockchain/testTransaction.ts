import { createSolanaTransaction } from "./transaction.ts";

(async () => {
    await createSolanaTransaction(20, "Hrithwin", "Null");
})();