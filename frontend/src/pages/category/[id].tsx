import { AdCard, AdCardType } from "@/components/AdCard";
import { CategoryType } from "@/components/Category";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FindAnnonceByCategory = () => {
  const [ads, setAds] = useState([] as AdCardType[]);
  const [currentCategory, setCurrentCategory] = useState([] as CategoryType[]);
  const router = useRouter();
  const id = router.query.id;

  const getAnnonceByCategory = async () => {
    try {
      const res = await axios.get(`${API_URL}/ads?categoryIn=${id}`);
      setAds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnnonceByCategory();
  }, [id]);

  const getCurrentCategory = async () => {
    try {
      let array = [];
      const res = await axios.get(`${API_URL}/categories/${id}`);
      console.log(res.data);
      array.push(res.data);
      setCurrentCategory(array);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentCategory();
  }, [id]);

  return (
    <Layout title="Annonces par catégorie">
      <div className="main-content">
        {currentCategory.map((c) => (
          <>
            <h2>Annonces par catégorie : {c.name}</h2>
          </>
        ))}
        {ads.map((ad) => (
          <>
            <AdCard
              id={ad.id}
              title={ad.title}
              price={ad.price}
              imgUrl={ad.imgUrl}
              link={"/ads/" + ad.id}
            />
          </>
        ))}
      </div>
    </Layout>
  );
};

export default FindAnnonceByCategory;
