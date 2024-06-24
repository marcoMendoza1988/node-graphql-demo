import { gql } from 'graphql-request';

const GET_ALL_LOANS = gql`
  query GetAllLoans {
    getAllLoans {
      pagina
      prestamos {
        amount
        fecha
      }
    }
  }
`;

export default GET_ALL_LOANS;
