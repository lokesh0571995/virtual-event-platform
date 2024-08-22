# Virtual Event Management Platform

Overview

This project is a backend system for a virtual event management platform, built using Node.js, Express.js, and MongoDB. The platform allows users to register, log in, create and manage events, and register for events. The system includes secure authentication using bcrypt and JWT, as well as role-based access control for event organizers and attendees.

# Features

User Authentication:

    1. Register and login functionality using bcrypt for password hashing.
    2. JWT-based session management.


Event Management:

    1. Create, update, and delete events.
    2. Manage event details like date, time, description, and participants.


Participant Management:

    1. Users can register for events.
    2. Organizers can view and manage participants.


In-Memory Operations:

    1. Initially, the system was designed to manage data in memory. This has been transitioned to use MongoDB for persistence.

Asynchronous Operations:

    1. Async/await and Promises are employed for operations such as sending email notifications.

Technologies Used

    1. Node.js: JavaScript runtime environment.
    2. Express.js: Web framework for Node.js.
    3. MongoDB: NoSQL database for storing users and events.
    4. Mongoose: ODM library for MongoDB.
    5. Nodemailer: For sending email notifications (configured with Mailtrap).
    6. bcrypt: Password hashing.
    7. jsonwebtoken: JWT-based authentication.
    8. Mocha & Chai: Testing framework and assertion library.
    9. dotenv: Environment variables management.


Installation Prerequisites

    1. Node.js (v14 or higher)
    2. MongoDB (local )
    3. Mailtrap account for testing emails


Steps

Clone the repository:

    1. git clone https://github.com/lokesh0571995/virtual-event-platform.git
    2. cd virtual-event-platform


Install dependencies:

    1. npm install

Set up environment variables:

    1. Create a .env file in the root directory with the following content:

    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/virtual-event-platform
    JWT_SECRET=your_jwt_secret
    MAILTRAP_HOST=sandbox.smtp.mailtrap.io
    MAILTRAP_PORT=2525
    MAILTRAP_USER=your_mailtrap_user
    MAILTRAP_PASS=your_mailtrap_pass


Run the application:

    1. npm start
    2. The server should start on http://localhost:5000.

Run tests:

    1. npm run test

This will run both unit and integration tests using Mocha and Chai.

API Endpoints

Authentication

    1. POST /api/auth/register: Register a new user.
    2. POST /api/auth/login: Login an existing user.

Event Management

    1. GET /api/events  : Get a list of all events.
    2. POST /api/events : Create a new event (Organizer only).
    3. PUT /api/events/ : Update an existing event (Organizer only).
    4. DELETE /api/events/ : Delete an event (Organizer only).


Participant Management

    1. POST /api/events/register: Register for an event.


Testing

The project uses Mocha and Chai for testing. Tests are organized into unit tests and integration tests.

Running Tests

To run the tests, use:

    1. npm run test

Test Structure

    1. Unit Tests: Located in test/unit, focusing on individual components or functions.
    2. Integration Tests: Located in test/integration, focusing on the interaction between different parts of the system.

Development Guidelines

    1. Follow JavaScript Standard Style.
    2. Use async/await for handling asynchronous operations.
    3. Follow SOLID principles for writing clean and maintainable code.

Final Thoughts

This solution provides a robust and scalable backend system with secure user authentication, comprehensive event management, and thorough validation and error handling, all optimized for high performance using Node.js. The system is designed to be industry-level, with extensive test coverage ensuring reliability.
