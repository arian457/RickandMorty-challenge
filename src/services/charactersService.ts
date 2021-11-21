import { getAllResources, getNumberOfPages } from '../utils/RequestUtils';

require('dotenv').config();

const { API_URL } = process.env;

const getAllCharacters = async (fields: string[]) => {
  const templateFields = fields.map((f) => `\n  ${f} `);
  const endpoint = 'characters';
  const totalPages = await getNumberOfPages(endpoint, API_URL);
  const characters = await getAllResources(API_URL, totalPages, endpoint, templateFields);
  return characters;
};

const charactersService = {
  getAllCharacters,
};

export default charactersService;
