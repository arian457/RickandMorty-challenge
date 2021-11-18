export interface characterCountData {
  char: string;
  count: number;
  resource: string;
}
export interface graphqlResponseObject {
  data: object[];
  [resource: string]: object[];
  results: object[];
}
export interface episodesLocationData {
  name: string;
  episode: string;
  locations: string[];
}
