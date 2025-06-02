import request from 'supertest';
import app from '../../app.js';
import mongoose from 'mongoose';

describe('GET /api/users', () => {
afterAll(async () => {
    await mongoose.connection.close();
});

it('debería responder con una lista de usuarios', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.payload)).toBe(true);
});
});