/* import { gql } from "@apollo/client";

export const GET_RECENT_MESSAGES_QUERY = gql`
  query GetRecentMessages($groupId: String!, $last: Int) @live {
    group(groupId: $groupId) {
      edges {
        node {
          messages(last: $last) {
            edges {
              node {
                id
                groupId
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
    }
  }
`; */

//------- before there were groups
import { gql } from "@apollo/client";

export const GET_RECENT_MESSAGES_QUERY = gql`
  query GetRecentMessages($last: Int) @live {
    messageCollection(last: $last) {
      edges {
        node {
          id
          groupId
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
`;
