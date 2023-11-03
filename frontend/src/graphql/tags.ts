import { gql } from "@apollo/client";

export const findAllTags = gql`
query FindAllTags {
  items: findAllTags {
    id
    name
    ads {
      id
    }
  }
}
`;