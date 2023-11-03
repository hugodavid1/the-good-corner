import { gql } from "@apollo/client";

export const queryAllCategories = gql`
query AllCategories {
  allCategories {
    id
    name
  }
}
`;

export const mutationDeleteCategory = gql`
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
  }
}
`;