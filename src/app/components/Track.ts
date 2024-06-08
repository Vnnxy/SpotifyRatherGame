// Track type to define the structure of the Tracks data
export interface Track {
    id: string;
    uri: string,
    name: string;
    imageURL: string;
    date: string;
    artists: string[];
  }