import express, { urlencoded } from "express";

import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`the server is listen on port ${port}`);
});
