import express from "express";

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1506460070978785372/_fknexXv1ft2rLqx55Pr0Bp4ITNjSyQrurUcjeUw8rDW8at1oh_rDMfS59TMGXO1rkZ-";

app.post("/fourthwall", async (req, res) => {
  res.status(200).send("OK");

  console.log("Fourthwall Event:", req.body);

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "🛒 New order on Trashy's merch store!",
    }),
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});