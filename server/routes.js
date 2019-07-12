import { graphql } from 'graphql';

const router = require('express').Router();

import GraphQlModel from '../graphql/index';

router.get('/', (req, res) => {
  console.log('hello....')
  res.status(200).json({
    msg: 'hello to User Management Services',
  });
});

router.get('/api/getbeers', async (req, res) => {
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

router.post('/api/register', async (request, response) => {
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

router.post('/api/login', async (request, response) => {
  const payload = {
    query: `query Q($email: String!, $password: String!){
      login(email: $email, password: $password){
        name
        userid: _id
        email
        token
      }
    }
    `,
    params: {...request.body }
  }
  const data = await graphql(GraphQlModel, payload.query, '', request, payload.params)
  response.status(200).json({ success: true, ff: request.body, data });
})

router.put('/api/users/update', async (request, response) => {
  const payload = {
    mutation: `mutation M($data: UserInput!) {
      updateuser(data: $data)
    }
    `,
    params: { data: { ...request.body } }
  }
  const _response = await graphql(GraphQlModel, payload.mutation, '', '', payload.params)
  response.status(200).json({ success: true, ff: request.body, response: _response });
})

module.exports = router;


// https://github.com/graphql/graphql-js