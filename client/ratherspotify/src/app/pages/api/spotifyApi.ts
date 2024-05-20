'use server'

const getAccessToken = async () => {
  
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

  const requestBody = new URLSearchParams();
  requestBody.append("grant_type", "refresh_token");
  requestBody.append("refresh_token", refresh_token);

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
    body: requestBody,
  });

  const data = await response.json();
  return data.access_token;
};

export default getAccessToken;

  