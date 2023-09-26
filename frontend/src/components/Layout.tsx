import Head from "next/head";
import { Header } from "./Header";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function Layout(props: LayoutProps): React.ReactNode {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Header />
        {props.children}
      </body>
    </>
  );
}
