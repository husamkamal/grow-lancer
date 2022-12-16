import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();
const { FREELANCER_TOKEN, CLIENT_TOKEN } = process.env;

const jobsTest = () => {
  // GET jobs tests
  test('Jobs - GET - /api/v1/jobs ', async () => {
    const response = await request(app)
      .get('/api/v1/jobs?title=full')
      .expect(200);
    expect(response.body.data.rows.length).toBe(1);
  });
  test('Jobs - GET - /api/v1/jobs ', async () => {
    const responseNoFound = await request(app)
      .get('/api/v1/jobs?title=fulllld')
      .expect(200);
    expect(responseNoFound.body.data.rows.length).toBe(0);
  });

  // delete single job tests
  test('respond with json containing Authentication error /No Token/ with status of 401', async () => {
    const response = await request(app)
      .delete('/api/v1/jobs/1')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing Authentication error /wrong Token/ with status of 401', async () => {
    const response = await request(app)
      .delete('/api/v1/jobs/1')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing  not found error /job not found/ with status of 400', async () => {
    const response = await request(app)
      .delete('/api/v1/jobs/1105')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('job not found');
  });
  test('respond with json containing  Bad request error /job is occupied/ with status of 400', async () => {
    const response = await request(app)
      .delete('/api/v1/jobs/1')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('job is Occupied');
  });
  test('respond with json containing success message', async () => {
    const response = await request(app)
      .delete('/api/v1/jobs/3')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.msg).toBe('Job deleted');
  });
  // GET single job tests
  test('Jobs - GET - /api/v1/jobs/2 ', async () => {
    const response = await request(app)
      .get('/api/v1/jobs/2')
      .expect(200);
    expect(response.body.data.id).toBe(2);
  });
  test('Jobs - GET - /api/v1/jobs/2333 ', async () => {
    const response = await request(app)
      .get('/api/v1/jobs/2333')
      .expect(200);
    expect(response.body.data).toEqual(null);
  });
  test('no token', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({})
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('freelancer token', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({})
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('send empty object with token', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({})
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('description is a required field');
  });
  test('send request with only the description with token', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({ description: 'lorem' })
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('category is a required field');
  });
  test('send request with only the description and category with token', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({ description: 'lorem', category: 'Programming & Tech' })
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('time is a required field');
  });
  test('send request with only the description and category', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({ description: 'lorem', category: 'Programming & Tech', time: '1 month' })
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('budget is a required field');
  });
  test('send request with only the description and category', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({
        description: 'lorem', category: 'Programming & Tech', time: '1 month', budget: 300,
      })
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('title is a required field');
  });
  test('send request with only the description and category', async () => {
    const response = await request(app)
      .post('/api/v1/jobs')
      .send({
        description: 'lorem', category: 'Programming & Tech', time: '1 month', budget: 300, title: 'job1',
      })
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.data.title).toBe('job1');
    expect(response.body.data.description).toBe('lorem');
    expect(response.body.data.category).toBe('Programming & Tech');
    expect(response.body.data.budget).toBe(300);
    expect(response.body.data.time).toBe('1 month');
    expect(response.body.data.userId).toBe(2);
  });
};

export default jobsTest;
