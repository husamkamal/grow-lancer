import insertDB from '../src/db/config/build';
import sequelize from '../src/db/config/connection';
import freelancerTests from './freelancer';
import clientTest from './client';
import jobsTest from './jobs';
import proposalsTests from './proposals';
import AuthTests from './auth';

beforeAll(() => insertDB());
afterAll(() => sequelize.close());

describe('Auth APIs', AuthTests);
describe('Jobs API', jobsTest);
describe('freelancer API /api/v1/freelancer', freelancerTests);
describe('proposals  API /api/v1/proposals', proposalsTests);
describe('POST /proposals - /api/v1/proposals Testing all Proposal inputs values', proposalsTests);
describe('GET/ client', clientTest);
