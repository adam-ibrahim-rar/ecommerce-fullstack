import dotenv from "dotenv";

dotenv.config();

 const env = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL:process.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
};
export default env;