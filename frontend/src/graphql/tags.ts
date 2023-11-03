import { gql } from "@apollo/client";

export const findAllTags = gql`
query AllTags {
 items: AllTags {
    id
    name
    ads {
      id
      title
    }
  }
}
`;