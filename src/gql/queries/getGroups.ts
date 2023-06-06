import { gql } from "@apollo/client";

export const GET_ALL_GROUPS_QUERY = gql`
  query GetAllRooms @live {
    groupCollection(last: 100) {
      edges {
        node {
          id
          groupId
          name
          messages(last: 100) {
            edges {
              node {
                id
                body
                username
                createdAt
              }
            }
          }
        }
      }
    }
  }
`;

/* messages {
            edges {
              node {
                id
                body
                username
                createdAt
              }
            }
          } */
