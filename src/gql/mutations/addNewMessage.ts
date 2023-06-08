import { gql } from "@apollo/client";

export const ADD_NEW_MESSAGE_MUTATION = gql`
  mutation AddNewMessage(
    $username: String!
    $name: String!
    $avatar: URL
    $body: String!
    $groupId: String!
    $group: ID!
  ) {
    messageCreate(
      input: {
        username: $username
        name: $name
        avatar: $avatar
        body: $body
        groupId: $groupId
        group: { link: $group }
      }
    ) {
      message {
        id
        username
        name
        avatar
        body
        likes
        createdAt
        group {
          id
          name
        }
      }
    }
  }
`;
