import { getAllResources, getNumberOfPages } from '../utils/RequestUtils';

require('dotenv').config();

const { API_URL } = process.env;

const getAllEpisodes = async (fields: string[]) => {
  const templateFields = fields.map((f) => `\n  ${f} `);
  const endpoint = 'episodes';
  const totalPages = await getNumberOfPages(endpoint, API_URL);
  const episodes = await getAllResources(API_URL, totalPages, endpoint, templateFields);
  return episodes;
};

const episodesService = {
  getAllEpisodes,
};

export default episodesService;
