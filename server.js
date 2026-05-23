import express from "express";

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1507205538147074130/h7kKhQS-AbGGMEtmcZF2y2TjMZEDZOk2cAn6HgpQGA-jCYL_7OCJ8q8VrB8Fx85Mikzu";

const processedOrders = new Set();

app.post("/fourthwall", async (req, res) => {
  res.status(200).send("OK");

  console.log(JSON.stringify(req.body, null, 2));

 const order = req.body.data || req.body;

const orderId = order.id;

if (processedOrders.has(orderId)) {
  console.log("Duplicate order ignored:", orderId);
  return res.status(200).send("Duplicate ignored");
}

processedOrders.add(orderId);

const total =
  `${order.amounts?.total?.value ?? 0} ${order.amounts?.total?.currency ?? ""}`;

const firstItem = order.offers?.[0];
const imageUrl = firstItem?.primaryImage?.url;
const itemName = firstItem?.name || "Unknown Item";
  
const items =
  order.offers
    ?.map(item => `• ${item.quantity || 1}x ${item.name}`)
    .join("\n") ||
  "Items unavailable";
await fetch(DISCORD_WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    embeds: [
      {
        title: "🦝 New Trashy's Back Alley Order!",
        description: "Somebody bought merch from the dumpster shop.",
        color: 16744192,

        image: imageUrl ? { url: imageUrl } : undefined,

        fields: [
          {
            name: "Item",
            value: itemName,
            inline: true
          },
          {
            name: "Total",
            value: total,
            inline: true
          },
          {
            name: "Items",
            value: items
          }
        ]
      }
    ]
  })
});

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});