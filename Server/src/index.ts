import express from "express";
import env from "./config/env";
import apiRoutes from "./api/v1/routes";
import { errorMiddleware } from "./api/v1/middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

const port = env.PORT;

app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(logger);
app.use("/api/v1", apiRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});