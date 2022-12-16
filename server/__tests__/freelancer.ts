import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();
const { FREELANCER_TOKEN, CLIENT_TOKEN } = process.env;

const freelancerTests = () => {
  // GET Freelancer tests
  test('respond with json containing Authentication error /No Token/ with status of 401', async () => {
    const response = await request(app)
      .get('/api/v1/freelancer/1')
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing Not Found msg with status of 404 ', async () => {
    const response = await request(app)
      .get('/api/v1/freelancer/20000')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect(400);
    expect(response.body.msg).toBe('Freelancer Not Found');
  });
  test('respond with json containing the freelancer info ', async () => {
    const response = await request(app)
      .get('/api/v1/freelancer/1')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect(200);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.user.name).toBe('Ahmed');
  });
  test('respond with json containing the freelancer info and only the accepted proposals /logged user is a client/ ', async () => {
    const response = await request(app)
      .get('/api/v1/freelancer/1')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect(200);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.user.name).toBe('Ahmed');
    expect(response.body.data.proposals.acceptedProposals).toBeDefined();
    expect(response.body.data.proposals.pendingProposals).toBeUndefined();
  });
  test('respond with json containing the freelancer info and only the accepted proposals / logged user is a freelancer & logged user id != params id', async () => {
    const response = await request(app)
      .get('/api/v1/freelancer/7')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect(200);
    expect(response.body.data.proposals.acceptedProposals).toBeDefined();
    expect(response.body.data.proposals.pendingProposals).toBeUndefined();
  });
  test('respond with json containing the freelancer info and both the accepted and pending proposals /logged user is a freelance & logged user id = params id/ ', async () => {
    const response = await request(app)
      .get('/api/v1/freelancer/1')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect(200);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.user.name).toBe('Ahmed');
    expect(response.body.data.proposals.acceptedProposals).toBeDefined();
    expect(response.body.data.proposals.pendingProposals).toBeDefined();
  });

  // PUT Freelancer tests
  test('respond with json containing Authentication error /No Token/ with status of 401', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing Authentication error /user is client not freelancer/ with status of 401', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .set({ Cookie: [`token=${CLIENT_TOKEN}`] })
      .expect(401);
    expect(response.body.message).toBe('unauthorized');
  });
  test('respond with json containing Validation error /name must not be empty string/ with status of 400', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .send({ name: '' })
      .expect(400);
    expect(response.body.message[0]).toBe('name must not be Empty');
  });
  test('respond with json containing Validation error /major must not be empty string/ with status of 400', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .send({ major: '' })
      .expect(400);
    expect(response.body.message[0]).toBe('major must not be Empty');
  });
  test('respond with json containing Validation error /title must not be empty string/ with status of 400', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .send({ title: '' })
      .expect(400);
    expect(response.body.message[0]).toBe('title must not be Empty');
  });
  test('respond with json containing no updated record msg', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .expect(200);
    expect(response.body.msg).toBe('No updated records');
  });
  test('respond with json containing success msg', async () => {
    const response = await request(app)
      .put('/api/v1/freelancer')
      .set({ Cookie: [`token=${FREELANCER_TOKEN}`] })
      .send({ name: 'newName', major: 'newMajor', title: 'newTitle' })
      .expect(200);
    expect(response.body.msg).toBe('Freelancer Updated successfully');
  });
};

export default freelancerTests;
