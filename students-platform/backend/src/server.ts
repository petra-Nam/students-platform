import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "api", ts: new Date().toISOString() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on :${port}`));
