import { gql } from "@apollo/client";

export const queryAllAds = gql`
query AllCategories {
  allCategories {
    id
    name
  }
  allAds {
    title
    tags {
      name
      id
    }
    price
    imgUrl
    id
    description
    createdAt
    category {
      id
      name
    }
  }
}
`;