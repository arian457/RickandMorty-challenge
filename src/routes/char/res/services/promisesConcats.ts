import graphqlFetch from '../../../../utils/customFetchs';

const promiseConcats = async (endpoint: string, url: string) => {
  const fetchArray: object[] = [];
  let i: number = 1;
  const numPagesQuery = ` query{\n  ${endpoint}(page: 1) {\n    info {\n      pages\n    }\n  }}`;

  const { data } = await graphqlFetch(url, endpoint, numPagesQuery);

  while (data[endpoint].info?.pages >= i) {
    const pagesQuery = ` query {\n  ${endpoint} (page: ${i} ) {\n  results {\n      name\n    }\n  }}`;
    const promise = graphqlFetch(url, endpoint, pagesQuery);
    fetchArray.push(promise);
    i += 1;
  }
  return Promise.all(fetchArray).then((values) => values);
};

export default promiseConcats;
