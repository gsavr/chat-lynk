import { gql } from "@apollo/client";

export const GET_ALL_GROUPS_QUERY = gql`
  query GetAllRooms {
    groupCollection(first: 100) {
      edges {
        node {
          groupId
          name
          messages(first: 100) {
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
