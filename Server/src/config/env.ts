import dotenv from "dotenv";

dotenv.config();

 const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL:process.env.DATABASE_URL
};
export default env;