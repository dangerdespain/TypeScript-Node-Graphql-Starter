import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const APOLLO_ENGINE_PORT = process.env["APOLLO_ENGINE_PORT"];
export const APOLLO_ENGINE_KEY = process.env["APOLLO_ENGINE_KEY"];
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const POSTGRES_URI = prod ? process.env["POSTGRES_URI"] : process.env["POSTGRES_URI_LOCAL"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

// if (!MONGODB_URI) {
//     logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
//     process.exit(1);
// }

export const IG_ADMIN_ABBY_PASSWORD = process.env['IG_ADMIN_ABBY_PASSWORD']
export const IG_ADMIN_LOCALFLUENCE_PASSWORD = process.env['IG_ADMIN_LOCALFLUENCE_PASSWORD']