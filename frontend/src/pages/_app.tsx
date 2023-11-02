import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { queryAllCategories } from "@/graphql/categories";
import { queryAllAds } from "@/graphql/ads";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: [queryAllCategories, queryAllAds],
//   })
//   .then((result) => console.log(result));

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
