import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const buildPath = path.join(path.resolve(__dirname, "./dist"));

app.use("", express.static(buildPath, { index: false }));

app.get(`isAlive|isReady`, (req, res) => {
    res.send("OK");
});

app.use(
    createProxyMiddleware({
        target: `${process.env.VITE_API_URL}`,
        changeOrigin: true,
        pathFilter: "/api",
    }),
);

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
