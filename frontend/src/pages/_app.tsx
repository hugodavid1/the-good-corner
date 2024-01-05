import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/graphql/users";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import { MeType } from "@/types";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
  credentials: "include",
});

const publicPages = ["/signin", "/signup", "/"];

function AuthProvider(props: { children: React.ReactNode }) {
  const { data, loading } = useQuery<{ item: MeType | null }>(getCurrentUser);
  const router = useRouter();

  useEffect(() => {
    console.log("Navigating, new path =>", router.pathname);
    if (publicPages.includes(router.pathname) === false) {
      console.log("Seems to be a private page");
      if (!data?.item) {
        console.log("Not connected, redirecting");
        router.replace("/signin");
      }
    }
  }, [router, data]);

  if (loading) {
    return <p>Chargement</p>;
  }

  return props.children;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
