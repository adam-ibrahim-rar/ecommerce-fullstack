import express from "express";
import env from "./config/env";
import apiRoutes from "./api/v1/routes";
import { errorMiddleware } from "./api/v1/middlewares/error.middleware";

const app = express();

const port = env.PORT;

app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});