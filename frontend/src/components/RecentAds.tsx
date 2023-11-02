import React, { useState } from "react";
import { AdCard, AdCardType } from "./AdCard";
import { mutationDeleteAd, queryAdById, queryAllAds } from "@/graphql/ads";
import { useQuery, useMutation } from "@apollo/client";

export function RecentAds(): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState(0);
  const { data, error, loading } = useQuery<{ allAds: AdCardType[] }>(
    queryAllAds
  );
  const ads = data?.allAds || [];
  const [doDelete] = useMutation(mutationDeleteAd, {
    refetchQueries: [queryAllAds],
  });

  // function getAdById(id: any) {
  //   const { data, loading, error } = useQuery(queryAdById, {
  //     variables: { id },
  //   });
  //   return data.ad;
  // }

  async function deleteAd(id: number) {
    try {
      console.log(id);
      const res = await doDelete({
        variables: {
          id: id,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleRedirect = (id: number) => {
    console.log(id);
    window.location.href = "/ads/new/" + id;
  };

  function addToTotal(price: number) {
    const newTotalPrice = price + totalPrice;
    setTotalPrice(newTotalPrice);
  }

  // async function getAllRecendsAds() {
  //   try {
  //     const res = await axios.get(`${API_URL}/ads`);
  //     console.log(res.data);
  //     setAds(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getAllRecendsAds();
  // }, []);

  // const handleDeleteAds = async (id: number) => {
  //   console.log(id);
  //   try {
  //     const res = await axios.delete(`${API_URL}/ads/${id}`);
  //     const refreshAd = ads.filter((ad) => ad.id !== id);
  //     setAds(refreshAd);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleEditAd = async (id: number) => {
  //   console.log(id);
  //   try {
  //     const res = await axios.patch(`${API_URL}/ads/${id}`);
  //     const refreshAd = ads.find((ad) => ad.id === id);
  //     if (refreshAd) {
  //       let path = `/ads/${id}`;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <h4>Montant de votre panier : {totalPrice}</h4>
      <section className="recent-ads">
        <div>
          {ads.map((item, i) => (
            <div key={item.price}>
              <AdCard
                id={item.id}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                link={"/ads/" + item.id}
              />
              <div className="row-button-ad">
                <button
                  className="button"
                  onClick={() => {
                    addToTotal(item.price);
                  }}
                >
                  Ajouter {item.price}€ au total
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => handleRedirect(item.id)}
                >
                  Modifier l'annonce
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => deleteAd(item.id)}
                >
                  Supprimer cette annonce
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
