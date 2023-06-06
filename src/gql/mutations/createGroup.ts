import { gql } from "@apollo/client";

export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($groupId: String!, $name: String!) {
    groupCreate(input: { groupId: $groupId, name: $name }) {
      group {
        groupId
        name
      }
    }
  }
`;
