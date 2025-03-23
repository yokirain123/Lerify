import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { code } = req.body;

  const CLIENT_ID = "eb8c8248af064de9bc46129ac931ed78";
  const CLIENT_SECRET = "afcff23c4e9848328e5e2220e02f06f2";
  const REDIRECT_URI = "http://localhost:3000/callback";

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return res.status(400).json({ error: data.error_description });
  }

  res.status(200).json(data);
}
