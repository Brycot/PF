const express = require('express');
const cors = require('cors');
const { connectionDB } = require('../database/mongo');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.authPath = '/api/auth';
    this.athletesPath = '/api/athletes';
    this.dateEventsPath = '/api/dateEvents';
    this.directorsPath = '/api/directors';
    this.donationsPath = '/api/donations';
    this.eventsPath = '/api/events';
    this.incomesPath = '/api/incomes';
    this.matchesPath = '/api/matches';
    this.postsPath = '/api/posts';
    this.subscriptionsPath = '/api/subscriptions';
    this.testimonialsPath = '/api/testimonials';
    this.uploadPath = '/api/uploads';
    this.usersPath = '/api/users';
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
    this.app.use(express.json({ limit: '1024mb' }));

    // It parses incoming requests with URL-encoded payloads
    this.app.use(express.urlencoded({ limit: '1024mb', extended: true }));

    //Public dir
    this.app.use(express.static('public'));
  }
  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.athletesPath, require('../routes/athletes'));
    this.app.use(this.dateEventsPath, require('../routes/dateEvents'));
    this.app.use(this.directorsPath, require('../routes/directors'));
    this.app.use(this.donationsPath, require('../routes/donations'));
    this.app.use(this.eventsPath, require('../routes/events'));
    this.app.use(this.incomesPath, require('../routes/incomes'));
    this.app.use(this.matchesPath, require('../routes/matches'));
    this.app.use(this.postsPath, require('../routes/posts'));
    this.app.use(this.subscriptionsPath, require('../routes/subscriptions'));
    this.app.use(this.testimonialsPath, require('../routes/testimonials'));
    this.app.use(this.uploadPath, require('../routes/uploads'));
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server runing on port: ${this.port}`);
    });
  }
}

module.exports = Server;
