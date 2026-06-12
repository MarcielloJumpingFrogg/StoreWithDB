import "dotenv/config";
import open from "open";
import express from "express";
import routes from "./src/startup/routes";

//routes:
//end routes

const app = express();
const PORT = process.env.PORT || 3000;
routes(app);

console.log("ENV: ", process.env.NODE_ENV);
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.listen(PORT, async () => {
  console.log("Listenting on port: ", PORT);
  //await open(`http://localhost:${PORT}`);
});

export { app }
