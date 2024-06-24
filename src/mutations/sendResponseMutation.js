import { gql } from 'graphql-request';

const SEND_RESPONSE = gql`
  mutation SendResponse($email: String!, $result: Float!) {
    sendResponse(email: $email, result: $result)
  }
`;

export default SEND_RESPONSE;
