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

export const queryAdById = gql`
query adById($id: ID!) {
  items: adById(id: $id) {
    id
    price
    title
    imgUrl
    description
    createdAt
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
`;

export const mutationDeleteAd = gql`
mutation DeleteAd($id: ID!) {
  deleteAd(id: $id) {
    id
  }
}
`;

export const mutationCreateAd = gql`
mutation Mutation($data: AdCreateInput!) {
  createAd(data: $data) {
    id
    title
    price
    imgUrl
    description
    createdAt
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
`;