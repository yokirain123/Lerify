// pages/api/spotify/track/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { authorization } = req.headers; // Get the authorization token from the request header

  if (!authorization) {
    return res.status(401).json({ error: "No authorization token provided" });
  }

  const accessToken = authorization.split(" ")[1]; // Extract the token from the 'Bearer <token>' format

  try {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the access token in the request
      },
    });

    if (!response.ok) {
      return res.status(401).json({ error: "Invalid token or failed to fetch track" });
    }

    const trackData = await response.json();
    return res.status(200).json(trackData); // Send the track data back to the client
  } catch (error) {
    console.error("Error fetching track data", error);
    return res.status(500).json({ error: "Failed to fetch track data" });
  }
};

export default handler;
