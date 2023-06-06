import { gql } from "@apollo/client";

export const GET_RECENT_MESSAGES_QUERY = gql`
  query Group($id: ID!, $last: Int) @live {
    group(by: { id: $id }) {
      id
      name
      messages(last: $last) {
        edges {
          node {
            id
            group
            username
            name
            avatar
            body
            likes
            createdAt
          }
        }
      }
    }
  }
`;

/* //------- before there were groups
import { gql } from "@apollo/client";

export const GET_RECENT_MESSAGES_QUERY = gql`
  query GetRecentMessages($last: Int) @live {
    messageCollection(last: $last) {
      edges {
        node {
          id
          group
          username
          name
          avatar
          body
          likes
          createdAt
        }
      }
    }
  }
`; */
