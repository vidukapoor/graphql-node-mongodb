import { graphql } from 'graphql';
import GraphQlModel from '../../../graphql/index';
import utils from '../../utils';

const router = require('express').Router();

router.get('/getbeers', async (req, res) => {
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
        token
      }
    }
    `,
    params: {...request.body }
  }
  const data = await graphql(GraphQlModel, payload.query, '', request, payload.params)
  response.status(200).json({ success: true, ff: request.body, data });
})

router.put('/users/update', async (request, response) => {
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

router.put('/order/signal', async (request, response) => {
  const { antsSignal, currentSignal } = request.body;
  // const _tradeResponse = await utils.tradeSignal(currentSignal);
  const _response = await utils.putTradeSignals(antsSignal);
  response.status(200).json({ success: true, response: _response });
})

module.exports = router;


// https://github.com/graphql/graphql-js