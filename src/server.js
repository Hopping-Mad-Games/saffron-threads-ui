const express = require("express");
const path = require("node:path");
const { templates } = require("./data/templates");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4173);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache");
    next();
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
});

app.get("/api/templates", (req, res) => {
    res.json({ templates });
});

app.use(express.static(PUBLIC_DIR, {
    index: "index.html",
    extensions: ["html"]
}));

app.use("/api", (req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, HOST, () => {
    console.log(`Saffron Threads showcase running at http://${HOST}:${PORT}`);
});
