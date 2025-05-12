import express from 'express';
import cors from 'cors';
import "dotenv/config";

import userRouter from './routes/user.routes.js'

const app = express();

app.listen(3000, console.log("app listening on port 3000"));

app.use(express.json());
app.use(cors());

app.use("/", userRouter);