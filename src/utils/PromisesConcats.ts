import { graphqlResponseObject } from '../interfaces';
import graphqlFetch from './customFetchs';

const promiseConcats = async (endpoint: string, url: string, fields?: string)
  : Promise<object> => {
  const fetchArray: object[] = [];
  let i: number = 1;
  const numPagesQuery:string = ` query{\n  ${endpoint}(page: 1) {\n    info {\n      pages\n    }\n  }}`;

  const { data } = await graphqlFetch(url, numPagesQuery);

  while (data[endpoint].info?.pages >= i) {
    const pagesQuery:string = ` query {\n  ${endpoint} (page: ${i} ) {\n  results {\n     ${fields}    }\n  }}`;
    const promise:Promise<graphqlResponseObject> = graphqlFetch(url, pagesQuery);
    fetchArray.push(promise);
    i += 1;
  }
  return Promise.all(fetchArray);
};
export default promiseConcats;
