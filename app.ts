import "dotenv/config";
import open from "open";
import express from "express";
import routes from "./src/startup/routes";

//routes:
//end routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/static', express.static('public'));

routes(app);


app.listen(PORT, async () => {
  console.log("Listenting on port: ", PORT);
  //await open(`http://localhost:${PORT}`);
});

export { app }
