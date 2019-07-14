import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import logger from 'morgan';
import schema from './graphql';
import allRoutes from './server/routes'
import CONFIG from './server/config';
const cors = require('cors');

require('./server/utils/crobJob');

mongoose.Promise = global.Promise;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true // false in case of production
})));

// Connect mongo database
mongoose.connect(`mongodb://${CONFIG.DB_USERNAME}:${CONFIG.DB_PASSWORD}@${CONFIG.MONGODB_URI}:${CONFIG.DB_PORT}/${CONFIG.DB_NAME}`);

app.use(allRoutes);
// start server
let server = app.listen(4000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('API server listening at http://%s:%s', host, port);
});

export default server;
