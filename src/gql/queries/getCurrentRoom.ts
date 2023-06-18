import { gql } from "@apollo/client";

export const GET_CURRENT_GROUP_QUERY = gql`
  query Group($groupId: String!) {
    group(by: { groupId: $groupId }) {
      id
      groupId
      name
      createdAt
    }
  }
`;
