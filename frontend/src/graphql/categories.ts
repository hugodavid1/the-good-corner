import { gql } from "@apollo/client";

export const queryAllCategories = gql`
query AllCategories {
  allCategories {
    id
    name
  }
}
`;