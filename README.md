# Spotify Would You Rather with NextJS.

This unique "Would You Rather" game incorporates the Spotify API to fetch tracks and display information about them. It allows you to create a Spotify playlist with your chosen songs and add recommendations based on your selections.

## Some footage

## Technologies used

- React
- Next.js
- Typescript
- Tailwind CSS

## Features

- Spotify API interactions.
- Creation and customization for playlists.

## Requirements:

- npm 10.5.2
- Next 14.2.3
- React 18

## Getting Started

### Installing the required modules and packages.

In the terminal:

```bash
npm install
```

### Spotify Api credentials:

To use the app, you need a Spotify account (any plan).

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and click on the **"Create App"** button.
2. Fill in any name and description. Use 'http://localhost:3000' as the **Redirect URI** (You can change it to your desired URI, however, be sure to change the next config files).

3. Select **"Web API"** as the API your app will be using.
4. After the app is created, note the **Client ID** and **Client Secret** for later use.

### Authorizarion:

1. Replace **<Client_ID\>** in the following URL with your actual Client ID and open it on your browser (If you used another uri, please change that too).

```
https://accounts.spotify.com/authorize?client_id=<Client_ID>
&response_type=code&redirect_uri=http://localhost:3000&scope=playlist-read-private+playlist-modify-private+playlist-modify-public+user-read-private
```

2. After authorizing, you'll be redirected to http://localhost:3000. The URL will contain a code parameter. Copy this code.

3. Base64 encode your Client ID and Client Secret with the format **'ClientID:ClientSecret'**. You can use [this tool](https://www.base64encode.org/). Please save the encoded result.

### Obtaining the Access Token

Run the following command in your terminal (replace **<clientId:clientSecret \>** with the encoded result and **<yourCode \>** with the code you copied earlier):

```bash
curl -H "Authorization: Basic <clientId:clientSecret>" -d grant_type=authorization_code -d code=<your Code> -d redirect_uri=http://localhost:3000 https://accounts.spotify.com/api/token
```

From the JSON response, note the **'refresh_token'**.

### Environment Variables

Create a **'.env'** file at the root of the directory with the following content:

```plaintext
SPOTIFY_CLIENT_ID='<Your client id>'
SPOTIFY_CLIENT_SECRET= '<Your client secret>'
SPOTIFY_REFRESH_TOKEN='<Your Refresh Token>'
```

### Running the devolpment server

In terminal:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Navigate to http://localhost:3000 and you are ready to play.

Thanks for trying out the Spotify Would You Rather game!
