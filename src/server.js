import express from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./routes/webRoute";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
