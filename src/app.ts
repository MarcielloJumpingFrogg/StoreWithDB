import "dotenv/config";
import open from "open";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, async () => {
  console.log("Listenting on port: ", PORT);
  //await open(`http://localhost:${PORT}`);
});
