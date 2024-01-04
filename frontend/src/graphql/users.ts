import { gql } from "@apollo/client";

export const mutationSignUp = gql`
  mutation Mutation($data: UserCreateInput!) {
    item: signUp(data: $data) {
      id
    }
  }
`;

export const mutationSignIn = gql`
  mutation Mutation($password: String!, $email: String!) {
    item: signIn(password: $password, email: $email) {
      id
      email
    }
  }
`;

export const getCurrentUser = gql`
  query Query {
    me {
      id
      email
    }
  }
`;

export const mutationSignOut = gql`
  mutation Mutation {
    item: signOut
  }
`;
