export interface charCountResult {
  char: string;
  count: number;
  resource: string;
}

export interface resultsObject {
  name: string;
  episode: string;
  characters: object[];
}
interface dataObject {
  episodes?: resultsObject
  locations?: resultsObject
  characters?: resultsObject

}
export interface graphqlResponseObject {
  data:dataObject;
  results: Array<resultsObject>;
}

export interface episodesLocationData {
  name?: string;
  episode?: string;
  locations?: string[];
}

interface originCharObject {
  name:string
 }
export interface charObject {
  origin?: originCharObject;
  location?: object[];
}

export interface errorResponse{
  status: number;
  message: string;
}
