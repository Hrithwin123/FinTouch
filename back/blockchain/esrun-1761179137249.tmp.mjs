process.argv = [process.argv[0], ...process.argv.slice(3)];

		import __esrun_url from 'url';

		import { createRequire as __esrun_createRequire } from "module";

		const __esrun_fileUrl = __esrun_url.pathToFileURL("D:\Hrithwin\fin\back\blockchain\esrun-1761179137249.tmp.mjs");

		const require = __esrun_createRequire(__esrun_fileUrl);
// publicKey.ts
import { Keypair } from "../node_modules/@solana/web3.js/lib/index.cjs.js";
import dotenv from "../node_modules/dotenv/lib/main.js";
dotenv.config();
var adminSecret = new Uint8Array(JSON.parse(process.env.SECRET_KEY || ""));
var adminPair = Keypair.fromSecretKey(adminSecret);
console.log("admin key:", adminPair.publicKey.toString());
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHVibGljS2V5LnRzIl0sCiAgInNvdXJjZVJvb3QiOiAiRDpcXEhyaXRod2luXFxmaW5cXGJhY2tcXGJsb2NrY2hhaW4iLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgUHVibGljS2V5LCBLZXlwYWlyIH0gZnJvbSBcIkBzb2xhbmEvd2ViMy5qc1wiO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIlxyXG5kb3RlbnYuY29uZmlnKClcclxuXHJcbmNvbnN0IGFkbWluU2VjcmV0ID0gbmV3IFVpbnQ4QXJyYXkoSlNPTi5wYXJzZShwcm9jZXNzLmVudi5TRUNSRVRfS0VZIHx8IFwiXCIpKTtcclxuY29uc3QgYWRtaW5QYWlyID0gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGFkbWluU2VjcmV0KTtcclxuY29uc29sZS5sb2coXCJhZG1pbiBrZXk6XCIsIGFkbWluUGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSk7XHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBb0IsZUFBZTtBQUNuQyxPQUFPLFlBQVk7QUFDbkIsT0FBTyxPQUFPO0FBRWQsSUFBTSxjQUFjLElBQUksV0FBVyxLQUFLLE1BQU0sUUFBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQzNFLElBQU0sWUFBWSxRQUFRLGNBQWMsV0FBVztBQUNuRCxRQUFRLElBQUksY0FBYyxVQUFVLFVBQVUsU0FBUyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

	