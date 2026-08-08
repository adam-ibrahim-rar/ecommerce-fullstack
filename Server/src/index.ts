import Express from 'express';
import {config} from 'dotenv';

config();
const app = Express();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
})