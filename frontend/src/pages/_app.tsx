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

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
  credentials: "include",
});

const publicPages = ["/signin", "/signup", "/"];

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(getCurrentUser);

  useEffect(() => {
    if (loading) {
      return;
      <Spinner color="warning" aria-label="Warning spinner example" />;
    }

    if (publicPages.includes(router.pathname) === false) {
      console.log("private page");
      if (error) {
        router.replace("/signin");
      }
    }
  }, [error, router]);

  if (loading) {
    return;
    <Spinner color="warning" aria-label="Warning spinner example" />;
  }

  return <>{children}</>;
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
