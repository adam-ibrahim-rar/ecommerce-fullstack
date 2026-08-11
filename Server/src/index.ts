import express from "express";
import env from "./config/env";
import connectDB from "./config/db";
const app = express();
const port = env.PORT;
connectDB();


app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
