import express from "express";
import dotenv from "dotenv";
import router from "./routers/calculator.js";
import { calculate } from "./routers/calculator.js";

dotenv.config();
const app = express();
const port = process.env.port;

app.use(express.json());
app.use(express.static("./frontend/dist"))
app.use("/calc", router)
app.get("/", () => {
   console.log("user");
})

app.listen(port, () => {
   console.log(`Server on ${port}`);
});