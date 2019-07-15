
import v1Routes from './v1';
const allRoutes = require('express').Router();

allRoutes.get('/', (req, res) => {
  res.status(200).json({
    msg: 'hello to User Management Services',
  });
});


allRoutes.use('/api/v1', v1Routes);

module.exports = allRoutes;