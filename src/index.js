import { ApolloServer, gql } from 'apollo-server';
import { GraphQLClient } from 'graphql-request';
import moment from 'moment';
import getToken from './utils/tokenUtils.js';
import GET_ALL_LOANS from './queries/loansQuery.js';
import SEND_RESPONSE from './mutations/sendResponseMutation.js';

const typeDefs = gql`
  type Query {
    email: String
  }
`;

const resolvers = {
  Query: {
    email: () => "my email is marco.mendoza.hill@gmail.com"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function getLoans(token) {
  const endpoint = 'https://challenge.fonicredito.com/graphql';
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  try {
    const data = await client.request(GET_ALL_LOANS);
    return data.getAllLoans;
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
}

function calculateTotal(loans) {
  const today = moment();
  let totalAmount = 0;

  loans.forEach(page => {
    page.prestamos.forEach(prestamo => {
      if (moment(prestamo.fecha, 'M/D/YYYY').isSameOrAfter(today)) {
        totalAmount += prestamo.amount;
      }
    });
  });

  return totalAmount;
}

async function sendResult(token, email, result) {
  const endpoint = 'https://challenge.fonicredito.com/graphql';
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  try {
    const variables = { email, result };
    const data = await client.request(SEND_RESPONSE, variables);
    console.log('Mutation result:', data);
  } catch (error) {
    console.error('Error sending result:', error);
  }
}

const email = 'marco.mendoza.hill@gmail.com';

getToken().then(token => {
  getLoans(token).then(loans => {
    const totalAmount = calculateTotal(loans);
    console.log({token, email, totalAmount, loans: JSON.stringify(loans)})
    // sendResult(token, email, totalAmount);
  });
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
