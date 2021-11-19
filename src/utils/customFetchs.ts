import { graphqlResponseObject } from '../interfaces';

const fetch = require('node-fetch');

const graphqlFetch = async (url: string, query?: string):Promise<graphqlResponseObject> => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export default graphqlFetch;
