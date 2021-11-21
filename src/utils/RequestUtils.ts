import { graphqlResponseObject } from '../interfaces';
import graphqlFetch from './customFetchs';

const buildQuery = (endpoint: string, page: number, fields: string[]) => {
  const resourcesQuery: string = ` query {\n  ${endpoint} (page: ${page} ) {\n  results {\n     ${fields}    }\n  }}`;
  return resourcesQuery;
};
const getAllResources = (url: string, totalPages: number, endpoint: string, fields: string[]) => {
  const promisesArray: object[] = [];
  let currentPage: number = 1;
  while (totalPages >= currentPage) {
    const query = buildQuery(endpoint, currentPage, fields);
    const promise: Promise<graphqlResponseObject> = graphqlFetch(url, query);
    promisesArray.push(promise);
    currentPage += 1;
  }
  return Promise.all(promisesArray);
};
const getNumberOfPages = async (endpoint: string, url: string) => {
  const numPagesQuery: string = ` query{\n  ${endpoint}(page: 1) {\n    info {\n      pages\n    }\n  }}`;
  const { data } = await graphqlFetch(url, numPagesQuery);
  const totalPages = data[endpoint].info?.pages;
  return totalPages;
};

export { getAllResources, getNumberOfPages };
