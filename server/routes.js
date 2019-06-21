import { graphql } from 'graphql';

const router = require('express').Router();

import BeerModel from '../graphql/index';

router.get('/hello', (req, res) => {
  console.log('hello....')
  res.status(200).json({
    msg: 'hello to User Management Services',
  });
});

router.get('/getbeers', async (req, res) => {
  console.log('hello....');
  const query = `{
    beers{
      _id
      name
      brewery {
        _id
        name
        location
      }
    }
  }`
  const data = await graphql(BeerModel, query, '')
  res.status(200).json({
    getbeers: data,
  });
});


module.exports = router;


// https://github.com/graphql/graphql-js