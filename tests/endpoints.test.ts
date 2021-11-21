import { Response } from 'superagent';
import supertest from 'supertest';
import { apiResponse } from '../src/interfaces';
import createServer from '../src/utils/createServer';

const server = createServer();
const request = supertest(server);

const fetch = async (route:string):Promise<Response> => {
    const response = await request.get(route);
    return response 
}

describe('Get exercises right-on-time', () => {
      let response: apiResponse;
  describe('get characters route', () => {

    beforeAll(async () => {
     response = await fetch('/api/v1/char')
    })
    it('should response a JSON in less than 3 seconds', async () => {
      expect(typeof response.body).toBe(typeof JSON);
      expect(response.body.in_time).toBe(true);
    });
    it('should response the exercise name, and an array of results', async () => {
      expect(response.body.exercise_name).toBe('Char counter');
      expect(Array.isArray(response.body.results)).toBe(true);
    });
    it('results to be an array with objects:characterCountData', async () => {
      expect(response.body.results[0]).toHaveProperty('char');
      expect(response.body.results[0]).toHaveProperty('count');
      expect(response.body.results[0]).toHaveProperty('resource');
    });
  });

  describe('get episodes route', () => {
  
      beforeAll(async () => {
        response = await fetch('/api/v1/episodes');
      });
    it('should response a JSON in less than 3 seconds', async () => {
      expect(typeof response.body).toBe(typeof JSON);
      expect(response.body.in_time).toBe(true);
    });
    it('should response the exercise name, and an array of results', async () => {
      expect(response.body.exercise_name).toBe('Episode locations');
      expect(Array.isArray(response.body.results)).toBe(true);
    });
    it('results to be an array with objects:episodesLocationData', async () => {
      expect(response.body.results[0]).toHaveProperty('name');
      expect(response.body.results[0]).toHaveProperty('episode');
      expect(response.body.results[0]).toHaveProperty('locations');
    });
  });
});
