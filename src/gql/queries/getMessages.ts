import { gql } from "@apollo/client";
//DO NOT PASS a 'last' var since it is not used in the group()

export const GET_RECENT_MESSAGES_QUERY = gql`
  query Group($id: ID!) @live {
    group(by: { id: $id }) {
      id
      groupId
      name
      messages(last: 100) {
        edges {
          node {
            id
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
