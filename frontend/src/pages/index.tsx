import { Header } from "@/components/Header";
import { RecentAds } from "@/components/RecentAds";
import Head from "next/head";
import AdDetailComponent from "./ads/[id]";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout title="Home">
        <main className="main-content">
          <RecentAds />
        </main>
      </Layout>
    </>
  );
}
