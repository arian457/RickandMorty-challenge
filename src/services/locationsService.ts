import { getNumberOfPages, getAllResources } from '../utils/RequestUtils';

require('dotenv').config();

const { API_URL } = process.env;

const getAllLocations = async (fields: string[]) => {
  const templateFields = fields.map((f) => `\n  ${f} `);
  const endpoint = 'locations';
  const totalPages = await getNumberOfPages(endpoint, API_URL);
  const locations = await getAllResources(API_URL, totalPages, endpoint, templateFields);
  return locations;
};
const locationService = {
  getAllLocations,
};
export default locationService;
