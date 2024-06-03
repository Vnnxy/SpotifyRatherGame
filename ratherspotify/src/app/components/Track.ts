// Album type to define the structure of the album data
export interface Track {
    id: string;
    uri: string,
    name: string;
    imageURL: string;
    date: string;
    artists: string[];
  }