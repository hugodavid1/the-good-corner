import FormAd from "@/components/FormAd";
import { Layout } from "@/components/Layout";

const newAd = () => {
  return (
    <Layout title="Créer une annonce">
      <div>
        <h1>Créer une annonce</h1>
        <FormAd />
      </div>
    </Layout>
  );
};

export default newAd;
