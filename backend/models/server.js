const express = require('express');
const cors = require('cors');
const { connectionDB } = require('../database/mongo');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.testimonialsPath = '/api/testimonials';
        this.postsPath = '/api/posts';
        this.athletesPath = '/api/athletes';
        this.eventsPath = '/api/events';
        // Connect to Data Base
        this.connectToDB();
        // Middlewares
        this.middlewares();
        // Routes of App
        this.routes();
    }

    async connectToDB() {
        await connectionDB();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        //Public dir
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        // this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.testimonialsPath, require('../routes/testimonials'));
        this.app.use(this.postsPath, require('../routes/posts'));
        this.app.use(this.eventsPath, require('../routes/events'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`server runing on port: ${this.port}`);
        });
    }
}

module.exports = Server;
