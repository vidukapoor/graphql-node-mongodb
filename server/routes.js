import { graphql } from 'graphql';

const router = require('express').Router();

import GraphQlModel from '../graphql/index';

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
  const data = await graphql(GraphQlModel, query, '')
  res.status(200).json({
    getbeers: data,
  });
});

router.post('/register', async (request, response) => {
  const payload = {
    mutation: `
    mutation M($data: UserInput!) {
      singnup(data: $data)
    }
    `,
    params: {
      data: { ...request.body }
    }
  }
  const data = await graphql(GraphQlModel, payload.mutation, '', '', payload.params)
  response.status(200).json({ success: true, ff: request.body, data });
})

router.post('/login', async (request, response) => {
  const payload = {
    query: `query Q($email: String!, $password: String!){
      login(email: $email, password: $password){
        name
        userid: _id
        email
      }
    }
    `,
    params: {...request.body }
  }
  const data = await graphql(GraphQlModel, payload.query, '', '', payload.params)
  response.status(200).json({ success: true, ff: request.body, data });
})

router.put('/changepassword', async (request, response) => {
  console.log(request.body)
  const payload = {
    mutation: `mutation M($data: UserInput!){
      changePassword(data: $data)
    }
    `,
    params: {data: {...request.body }}
  }
  const data = await graphql(GraphQlModel, payload.query, '', '', payload.params)
  response.status(200).json({ success: true, ff: request.body, data });
})

module.exports = router;


// https://github.com/graphql/graphql-js