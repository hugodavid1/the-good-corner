import { gql } from "@apollo/client";

export const queryAllAds = gql`
query AllAds($take: Int, $skip: Int, $where: AdsWhere) {
  items: allAds(take: $take, skip: $skip, where: $where ) {
    id
    title
    price
    imgUrl
    description
    createdAt
    tags {
      id
      name
    }
    category {
      id
      name
    }
  }
  count: allAdsCount(where: $where)
}
`;


export const AdById = gql`
  query AdById($adByIdId: ID!) {
   item: adById(id: $adByIdId) {
    title
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

export const mutationDeleteAd = gql`
mutation DeleteAd($id: ID!) {
  deleteAd(id: $id) {
    id
  }
}
`;

export const mutationCreateAd = gql`
mutation Mutation($data: AdCreateInput!) {
  item: createAd(data: $data) {
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

export const mutationUpdateAd = gql`
  mutation updateAd($id: ID!, $data: AdUpdateInput!) {
    updateAd(id: $id, data: $data) {
      id
    }
  }
`;
