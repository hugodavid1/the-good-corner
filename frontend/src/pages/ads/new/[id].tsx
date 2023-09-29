import FormAd, { AdFormData } from "@/components/FormAd";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditAdPage = () => {
  const id = useRouter().query.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = (data: AdFormData) => {
    axios.patch(`${API_URL}/ads/${id}`, data);
  };

  const [initialData, setInitialData] = useState<AdFormData | null>(null);

  useEffect(() => {
    const fetchAdData = async () => {
      if (id) {
        const response = await axios.get(`${API_URL}/ads/${id}`);
        setInitialData({
          title: response.data.title,
          description: response.data.description,
          imgUrl: response.data.imgUrl,
          price: response.data.price,
          category: response.data.category,
        });
        setIsLoading(false);
        console.log(response.data);
      }
    };

    fetchAdData();

    console.log(initialData);
  }, [id]);

  return (
    <Layout title="Modifier une annonce">
      <div>
        <h1>Créer une annonce</h1>
        {initialData && !isLoading && (
          <FormAd
            initialData={initialData}
            onSubmit={handleSubmit}
            buttonText="Modifier l'annonce"
          />
        )}
      </div>
    </Layout>
  );
};

export default EditAdPage;
