import { gql } from "@apollo/client";

export const DELETE_GROUP_MUTATION = gql`
  mutation GroupDelete($groupId: String!) {
    groupDelete(by: { groupId: $groupId }) {
      deletedId
    }
  }
`;
