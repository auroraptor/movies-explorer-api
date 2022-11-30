const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { logNow, logError } = require('./utils/log');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

const { PORT = 3000, DB = 'mongodb://localhost:27017/moviesdb-dev', NODE_ENV } = process.env;

mongoose.connect(DB, { autoIndex: true })
  .then(() => logNow(`[${NODE_ENV ? 'PROD' : 'DEV'} MODE]: Connected to the ${DB}`))
  .catch((err) => logError(err));

app.use('/api', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => logNow(`App listening on port ${PORT}`));
