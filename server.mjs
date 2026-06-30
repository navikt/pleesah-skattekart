import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = "";

const app = express();

const buildPath = path.join(path.resolve(__dirname, "./dist"));

app.use(basePath, express.static(buildPath, { index: false }));

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
    res.send("OK");
});

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
    res.sendFile(`${buildPath}/index.html`),
);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});