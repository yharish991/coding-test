/* eslint no-console: 0*/
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.VCAP_APP_PORT || 3005;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/rest/v1/users', require('./server/src/users/router'));

// Launch the application.
http.createServer(app).listen(port,
  () => {
    console.log('Server started');
    console.log(`App listening on port ${port}`);
  }
);
