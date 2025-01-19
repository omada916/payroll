import express from "express";
import router from "./routers/calculator.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("./frontend/dist"))
app.use("/calc", router)
app.get("/", () => {
   console.log("user");
})

app.listen(port, () => {
   console.log(`Server on ${port}`);
});