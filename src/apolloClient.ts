import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.102:3001/graphql',
  cache: new InMemoryCache(),
});

export default client;
