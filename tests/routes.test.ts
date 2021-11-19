import supertest from 'supertest';
import createServer from '../src/utils/createServer';

const server = createServer();
const request = supertest(server)

describe('Get exercises right-on-time', () => {
 
  describe('get characters route', () => {
    it('should response a JSON in less than 3 seconds', async () => {
      const { body } = await request.get('/api/v1/char');
      expect(typeof (body)).toBe(typeof (JSON));
      expect(body.in_time).toBe(true)
    });
    it('should response the exercise name, and an array of results', async () => {
      const { body } = await request.get('/api/v1/char');
      expect(body.exercise_name).toBe("Char counter");
      expect(Array.isArray(body.results)).toBe(true)
    });
    it('results to be an array with objects:characterCountData', async () => {
      const { body } = await request.get('/api/v1/char');
      expect(body.results[0]).toHaveProperty("char");
      expect(body.results[0]).toHaveProperty("count");
      expect(body.results[0]).toHaveProperty("resource");
    });
  });

  describe('get episodes route', () => {
    it('should response a JSON in less than 3 seconds', async () => {
      const { body } = await request.get('/api/v1/episodes');
      expect(typeof (body)).toBe(typeof (JSON));
      expect(body.in_time).toBe(true)
    });
    it('should response the exercise name, and an array of results', async () => {
      const { body } = await request.get('/api/v1/episodes');
      expect(body.exercise_name).toBe("Episode locations");
      expect(Array.isArray(body.results)).toBe(true)
    });
    it('results to be an array with objects:episodesLocationData', async () => {
      const { body } = await request.get('/api/v1/episodes');
      expect(body.results[0]).toHaveProperty("name");
      expect(body.results[0]).toHaveProperty("episode");
      expect(body.results[0]).toHaveProperty("locations");
    });
  });
});
