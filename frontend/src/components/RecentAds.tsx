import React, { useState } from "react";
import { AdCard, AdType } from "./AdCard";
import { mutationDeleteAd, AdById, queryAllAds } from "@/graphql/ads";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export function RecentAds(): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const { data, error, loading } = useQuery<{ allAds: AdType[] }>(queryAllAds);
  const ads = data?.allAds || [];
  const [doDelete] = useMutation(mutationDeleteAd, {
    refetchQueries: [queryAllAds],
  });
  const adId = router.query.id;
  const { data: dataAd } = useQuery<{ item: AdType }>(AdById, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data : null;

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
  const handleRedirectEdit = (id: number) => {
    window.location.href = `/ads/${id}/edit`;
  };

  function addToTotal(price: number) {
    const newTotalPrice = price + totalPrice;
    setTotalPrice(newTotalPrice);
  }

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <h4>Montant de votre panier : {totalPrice}</h4>
      <section className="recent-ads">
        {ads.map((item, i) => (
          <div key={item.id}>
            <AdCard
              id={item.id}
              title={item.title}
              price={item.price}
              imgUrl={`./images/${item.imgUrl}`}
              link={"/ads/" + item.id}
              description={item.description}
              category={item.category}
              createdAt={item.createdAt}
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
                onClick={() => handleRedirectEdit(item.id)}
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
      </section>
    </main>
  );
}
