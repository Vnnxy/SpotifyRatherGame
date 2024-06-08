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
  try{
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
    cache: 'no-cache'
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to refresh access token:', errorText);
    throw new Error(`Failed to refresh access token: ${response.statusText}`);
  }

  const data: { access_token: string } = await response.json();
    return data.access_token;
}catch(error){
  console.error('Error in getting the Access Token', error);
  throw error;
}
};

// INterface for the fetching options
interface FetchOptions extends RequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

/**
 * Integrates the fetch method and the getAccessToken in one.
 * @param url The url we will be requesting/posting the data.
 * @param options The additional options for the data.
 * @returns  Promise<Response>
 */
const fetchWithToken = async (url: string, options: FetchOptions = {}): Promise<Response> => {
  let accessToken = await getAccessToken();

  /**
   * Makes the request to the given url
   * @param token The access Token
   * @returns Response.
   */
  const makeRequest = async (token: string): Promise<Response> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      accessToken = await getAccessToken();

      // Retry the request with the new token
      return await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return response;
  };

  let response: Response;
  try {
    response = await makeRequest(accessToken);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify API request failed:', errorText);
      throw new Error(`Spotify API request failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in fetchWithToken:', error);
    throw error;
  }

  return response;
};

export default fetchWithToken;
