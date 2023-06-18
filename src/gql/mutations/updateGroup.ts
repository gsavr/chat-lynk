import { gql } from "@apollo/client";

export const UPDATE_GROUP_MUTATION = gql`
  mutation GroupUpdate($groupId: String!, $name: String!) {
    groupUpdate(by: { groupId: $groupId }, input: { name: $name }) {
      group {
        name
        groupId
      }
    }
  }
`;
