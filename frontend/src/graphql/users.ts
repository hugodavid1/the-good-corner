import { gql } from "@apollo/client";

export const mutationSignUp = gql`
  mutation Mutation($data: UserCreateInput!) {
    item: signUp(data: $data) {
      id
    }
  }
`;
