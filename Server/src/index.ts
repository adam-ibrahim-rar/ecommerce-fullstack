import express from "express";
import env from "./config/env";
import prisma from "./config/prisma";

const app = express();
const port = env.PORT;
app.use(express.json());


app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
