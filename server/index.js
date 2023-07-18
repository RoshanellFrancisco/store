import express from "express";
import cors from "cors";
import 'dotenv/config'
const app = express();
const PORT = 8080;

app.use(cors());


app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`))
