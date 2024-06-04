'use server'

/**
 * Handles the authorization and refreshes the auth token required for the usage of the Spotify API.
 * @returns A valid access token.
 */
const getAccessToken = async () => {
  
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

  //Error handling when env vars are missing.
  if (!refresh_token || !client_id || !client_secret) {
    throw new Error('Missing Spotify environment variables');
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

export default getAccessToken;

  