import FormAd, { AdFormData } from "@/components/FormAd";
import { Layout } from "@/components/Layout";
import axios from "axios";
import { FormEvent } from "react";

const newAd = () => {
  const handleSubmit = async (data: AdFormData) => {
    console.log(data);
    await axios.post("http://localhost:5000/ads", data);
  };
  return (
    <Layout title="Créer une annonce">
      <div>
        <h1>Créer une annonce</h1>
        <FormAd onSubmit={handleSubmit} buttonText="Créer une annonce" />
      </div>
    </Layout>
  );
};

export default newAd;
