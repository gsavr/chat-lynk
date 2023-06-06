import { gql } from "@apollo/client";

export const ADD_NEW_MESSAGE_MUTATION = gql`
  mutation AddNewMessage(
    $groupId: String!
    $username: String!
    $name: String!
    $avatar: URL
    $body: String!
  ) {
    messageCreate(
      input: {
        groupId: $groupId
        username: $username
        name: $name
        avatar: $avatar
        body: $body
      }
    ) {
      message {
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
`;
