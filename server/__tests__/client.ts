import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();
const { FREELANCER_TOKEN, CLIENT_TOKEN } = process.env;

const clientTest = () => {
  test('get client Jobs/ GET/client', async () => {
    const response = await request(app)
      .get('/api/v1/client')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });

  test('get client Jobs/ GET/client', async () => {
    const response = await request(app)
      .get('/api/v1/client')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });

  test('get client Jobs/ GET/client', async () => {
    await request(app)
      .get('/api/v1/client')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('get client Jobs/ GET/client', async () => {
    const response = await request(app)
      .get('/api/v1/client')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.data.count).toBe(5);
  });
};

export default clientTest;
