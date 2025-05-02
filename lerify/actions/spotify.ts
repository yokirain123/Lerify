'use server'

import axios from "axios"

const SPOTIFY_TOKEN_URI = "https://accounts.spotify.com/api/token"
const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1"

export interface AccessTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

let currentAccessToken: string | null = null
let tokenExpiry: number | null = null

// Function to fetch a new access token
export const getSpotifyToken = async (): Promise<AccessTokenResponse> => {
  const response = await axios.post(SPOTIFY_TOKEN_URI, {
    grant_type: "client_credentials",
    client_id: process.env.AUTH_SPOTIFY_ID,
    client_secret: process.env.AUTH_SPOTIFY_SECRET
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  return response.data as AccessTokenResponse
}

// Function to get a valid access token (refreshes it if expired)
const getValidAccessToken = async (): Promise<string> => {
  if (currentAccessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return currentAccessToken
  }
  const response = await getSpotifyToken()
  currentAccessToken = response.access_token
  tokenExpiry = Date.now() + response.expires_in * 1000
  return currentAccessToken
}

// Function to get current user's top tracks
export const getCurrentUserTopTracks = async (time_range?: "short_term" | "medium_term" | "long_term") => {
  const access_token = await getValidAccessToken()
  const response = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/tracks?time_range=${time_range}&limit=8`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })

  return response.data
}

// Function to get current user's top artists
export const getCurrentUserTopArtists = async (time_range?: "short_term" | "medium_term" | "long_term") => {
  const access_token = await getValidAccessToken()
  const response = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/artists?time_range=${time_range}&limit=8`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  return response.data
}
