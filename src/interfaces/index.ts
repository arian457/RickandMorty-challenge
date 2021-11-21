//enums
enum Resources {
  'locations',
  'episodes',
  'characters',
}
//

//External API's interfaces
export interface graphqlResponseObject {
  data: dataObject;
}
export interface resultsObject {
  results: Array<episodesReqData>;
}
export interface episodesReqData {
  name:string;
  episode:string;
  characters:any[]
}
interface dataObject {
  episodes?: resultsObject;
  locations?: resultsObject;
  characters?: resultsObject;
}
interface originReqResults {
  name: string;
}
export interface charactersName{
  name:string
}
export interface charObject {
  origin?: originReqResults;
  location?: object[];
}

// exercise interfaces
interface execOneResults {
  char: string;
  resource: string;
  count: number;
}
interface execTwoResults {
  name: string;
  episode: string;
  locations: string[];
}
interface exerciseResponse {
  exercise_name: string;
  in_time: boolean;
  time: string;
  results: [execOneResults | execTwoResults];
}
export interface charCountResult {
  char: string;
  count: number;
  resource: string;
}
export interface episodesLocationResults {
  name?: string;
  episode?: string;
  locations?: string[];
}
// end


//express custom interfaces
export interface errorResponse {
  status: number;
  message: string;
}
export interface apiResponse {
  body: exerciseResponse;
}
// end
