import { NextApiRequest, NextApiResponse } from 'next'

const SPOTIFY_API = 'https://api.spotify.com/v1/tracks'

// Function to fetch track by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const accessToken = req.headers['authorization']?.split(' ')[1] // Get Bearer token from request headers

  if (!accessToken) {
    return res.status(401).json({ error: 'Authorization token is required' })
  }

  try {
    // Fetch track data from Spotify API
    const response = await fetch(`${SPOTIFY_API}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(401).json({ error: 'Authorization token expired or invalid' })
      }
      return res.status(response.status).json({ error: 'Failed to fetch track' })
    }

    const data = await response.json()
    res.status(200).json(data) // Return track data including preview_url
  } catch (error) {
    console.error('Error fetching track:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
