// Minimal backend for the example: opens a BaaS session with the API key from the environment.
// Run: BAAS_API_KEY=<sandbox key> node server.mjs   (never commit keys)
import express from "express";
import crypto from "node:crypto";

const app = express();
app.post("/api/baas/session", async (_req, res) => {
  const r = await fetch("https://api.baaslatam.com/v1/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": process.env.BAAS_API_KEY },
    body: JSON.stringify({ purpose: "enrollment", subject_ref: "demo-user-1", nonce: crypto.randomUUID() }),
  });
  res.status(r.status).json(await r.json());   // return the body unchanged
});
// Verify the verification token server-side against https://api.baaslatam.com/.well-known/jwks.json
app.listen(8787, () => console.log("example backend on http://localhost:8787"));
