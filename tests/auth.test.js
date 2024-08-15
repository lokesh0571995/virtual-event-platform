const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const assert = require('assert');

describe('Auth API', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
           
        });
        await User.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('POST api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app).post('/api/auth/register').send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'organizer'
            });
            assert.strictEqual(res.statusCode, 200);
            assert.ok(res.body.token);
        });

        it('should not register a user with an existing email', async () => {
            const res = await request(app).post('/api/auth/register').send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
            assert.strictEqual(res.statusCode, 400);
           
        });
    });

    describe('POST api/auth/login', () => {
        it('should login a user with valid credentials', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'test@example.com',
                password: 'password123'
            });
            assert.strictEqual(res.statusCode, 200);
            assert.ok(res.body.token);
        });

        it('should not login a user with invalid credentials', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
            assert.strictEqual(res.statusCode, 400);
            
        });
    });
});
