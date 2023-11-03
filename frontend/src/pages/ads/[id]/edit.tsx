import { AdType } from "@/components/AdCard";
import FormAd, { AdFormData } from "@/components/FormAd";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import { AdById } from "@/graphql/ads";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditAdPage = () => {
  const adId = useRouter().query.id as string;
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery<{ item: AdType }>(AdById, {
    variables: {
      adByIdId: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;
  console.log(adId);

  return (
    <Layout title="Modifier une annonce">
      <main className="main-content">{ad && <FormAd ad={ad} />}</main>
    </Layout>
  );
};

export default EditAdPage;
