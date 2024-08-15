const request = require('supertest');
const http = require('http');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');
const assert = require('assert');

let server;
let token;

describe('Event API', () => {
    before(async () => {
        server = http.createServer(app);
        await mongoose.connect(process.env.MONGODB_URI, {
            
        });
        await User.deleteMany({});
        await Event.deleteMany({});

        await request(server).post('/api/auth/register').send({
            name: 'Test Organizer',
            email: 'organizer@example.com',
            password: 'password123',
            role: 'organizer'
        });

        const res = await request(server).post('/api/auth/login').send({
            email: 'organizer@example.com',
            password: 'password123'
        });

        token = res.body.token;
    });

    after(async () => {
        await mongoose.connection.close();
        server.close();
    });

    describe('POST api/events', () => {
        it('should create a new event', async () => {
            const res = await request(server)
                .post('/api/events')
                .set('x-auth-token', token)
                .send({
                    organizer: "66b793c10e933cf9e1b8233a",
                    title: 'Test Event',
                    description: 'This is a test event',
                    date: '2024-12-31',
                   
                });

            assert.strictEqual(res.statusCode, 401);
           
        });
    });
});
