import fetch from 'node-fetch';

const graphqlFetch = async (url: string, endpoint: string, query?: string) => {
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
