import { graphql } from 'graphql';
import GraphQlModel from '../graphql/index';

class ResolversWrappers {
  Orders() {
    // orders resolvers
  }

  async addSignals(variables) {
    const payload = {
      mutation: `
      mutation M($data: SignalInput!){
        addSignal(data: $data)
      }
      `,
      params: {
        data: { ...variables }
      }
    };
    const data = await graphql(GraphQlModel, payload.mutation, '', '', payload.params);
    return data
  }
}
const resolvers = new ResolversWrappers();
export default resolvers;