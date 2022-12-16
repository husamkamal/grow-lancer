import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';
import insertDB from '../src/db/config/build';

dotenv.config();
const { FREELANCER_TOKEN, CLIENT_TOKEN } = process.env;
const proposalsTests = () => {
  test('respond with json containing Authentication error /No Token/ with status of 401', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({})
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing Authentication error /Token payload role is client/ with status of 401', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({})
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing validation error /description is empty/ with status of 400', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({})
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('description is a required field');
  });

  test('respond with json containing validation error /description length < 15/ with status of 400', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({ description: 'gggggggggg' })
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('description must be at least 15 characters');
  });

  test('respond with json containing validation error /jopID is empty/ with status of 400', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({ description: 'lorem lorem lorem lorem' })
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('jobId is a required field');
  });
  test('respond with json containing validation error /jopID is string/ with status of 400', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({ description: 'lorem lorem lorem lorem', jobId: 'ID' })
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message[0]).toBe('jobId must be a `number` type, but the final value was: `NaN` (cast from the value `\"ID\"`).');
  });

  test('respond with json containing validation error /attachments is not a url/ with status of 400', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({
        description: 'lorem lorem lorem lorem', jobId: 1, id: 10, attachments: 'ht://placeholder.com',
      })
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message[0]).toBe('attachments must be a valid URL');
  });

  test('respond with json containing the created proposal details with status of 200', async () => {
    const response = await request(app)
      .post('/api/v1/proposals')
      .send({
        description: 'lorem lorem lorem lorem', jobId: 1, attachments: 'https://placeholder.com/',
      })
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.data.jobId).toBe(1);
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(15);
    expect(response.body.data.isAccepted).toBeFalsy();
    expect(response.body.data.attachments).toBe('https://placeholder.com/');
  });
  // delete poroposals
  test('delete proposal with out token', async () => {
    const response = await request(app)
      .delete('/api/v1/proposals/2')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('delete proposal with token and not found proposals', async () => {
    const response = await request(app)
      .delete('/api/v1/proposals/234')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('proposal not found');
  });
  test('delete proposal with token and userID not as freelancer', async () => {
    const response = await request(app)
      .delete('/api/v1/proposals/2')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('delete proposal with token ', async () => {
    await insertDB();
    const response = await request(app)
      .delete('/api/v1/proposals/1')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.msg).toBe('deleted successfully');
  });
  test('delete proposal with token ', async () => {
    const response = await request(app)
      .delete('/api/v1/proposals/1')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('proposal not found');
  });

  test('update proposal with token', async () => {
    await insertDB();
    const response = await request(app)
      .put('/api/v1/proposals/1')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .send({
        description: 'update proposal for test test test test',
        attachments: 'https://github.com/CA-G12/g-lancer/issues',
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.msg).toBe('updated');
  });
  test('update proposal without token', async () => {
    const response = await request(app)
      .put('/api/v1/proposals/3')
      .send({})
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('update proposal for different freelancer', async () => {
    const response = await request(app)
      .put('/api/v1/proposals/4')
      .send({
        description: 'update proposal for test test test test',
        attachments: 'https://github.com/CA-G12/g-lancer/issues',
      })
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  // Accept Proposal tests
  // test('respond with json containing Authentication error /No Token/ with status of 401',
  //  async () => {
  //   const response = await request(app)
  //     .patch('/api/v1/proposals/3')
  //     .expect('Content-Type', /json/)
  //     .expect(401);
  //   expect(response.body.message).toBe('unauthorized');
  // });
  // test('respond with json containing Authentication error /not Client token/ with status of 401',
  //  async () => {
  //   const response = await request(app)
  //     .patch('/api/v1/proposals/3')
  //     .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
  //     .expect('Content-Type', /json/)
  //     .expect(401);
  //   expect(response.body.message).toBe('unauthorized');
  // });
  // test('respond with json containing Authentication error /the job is not for the logged client',
  //  async () => {
  //   const response = await request(app)
  //     .patch('/api/v1/proposals/2')
  //     .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
  //     .expect('Content-Type', /json/)
  //     .expect(401);
  //   expect(response.body.message).toBe('unauthorized');
  // });
  // test('respond with json containing bad req error', async () => {
  //   const response = await request(app)
  //     .patch('/api/v1/proposals/5445')
  //     .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
  //     .expect('Content-Type', /json/)
  //     .expect(400);
  //   expect(response.body.message).toBe('Proposal Not Found');
  // });
  // test('respond with success msg with status of 200', async () => {
  //   const response = await request(app)
  //     .patch('/api/v1/proposals/5')
  //     .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
  //     .expect('Content-Type', /json/)
  //     .expect(200);
  //   expect(response.body.msg).toBe('Proposal Accepted');
  // });
  // test('the accepted proposals job isOccupied changes to true ', async () => {
  //   const response = await request(app)
  //     .get('/api/v1/jobs/3')
  //     .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
  //     .expect('Content-Type', /json/)
  //     .expect(200);

  //   expect(response.body.data.isOccupied).toBe(true);
  // });
};

export default proposalsTests;
