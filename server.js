import express from "express";

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1506460070978785372/_fknexXv1ft2rLqx55Pr0Bp4ITNjSyQrurUcjeUw8rDW8at1oh_rDMfS59TMGXO1rkZ-";

app.post("/fourthwall", async (req, res) => {
  res.status(200).send("OK");

  console.log(JSON.stringify(req.body, null, 2));

 const order = req.body.data || req.body;

const total =
  order.total?.formatted ||
  order.totalAmount?.formatted ||
  order.amount?.formatted ||
  order.total ||
  order.totalAmount ||
  "Amount not available";

const items =
  order.items
    ?.map(item => `• ${item.quantity || 1}x ${item.name || item.productName}`)
    .join("\n") ||
  "Items unavailable";

await fetch(DISCORD_WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    content:
`🛒 New order on Trashy's Back Alley Merch Store!

💰 Amount spent: ${total}

📦 Items:
${items}`,
  }),
});
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});