// pages/api/shipping.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch("https://api.shipengine.com/v1/rates/estimate", {
      method: "POST",
      headers: {
        "API-Key": process.env.SHIPENGINE_API_KEY, // Use environment variable
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to fetch rates' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rates from ShipEngine" });
  }
}
