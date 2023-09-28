import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { AdCard, AdCardProps } from "./AdCard";
import axios from "axios";
import { API_URL } from "@/config";
import path from "path";

export const ads: AdCardProps[] = [
  {
    id: 1,
    title: "Table",
    price: 120,
    link: "/ads/table",
    imgUrl: "/images/table.webp",
  },
  {
    id: 2,
    title: "Dame-jeanne",
    price: 75,
    link: "/ads/dame-jeanne",
    imgUrl: "/images/dame-jeanne.webp",
  },
  {
    id: 3,
    title: "Vide-poche",
    price: 4,
    link: "/ads/vide-poche",
    imgUrl: "/images/vide-poche.webp",
  },
  {
    id: 4,
    title: "Vaisselier",
    price: 900,
    link: "/ads/vaisselier",
    imgUrl: "/images/vaisselier.webp",
  },
  {
    id: 5,
    title: "Bougie",
    price: 8,
    link: "/ads/bougie",
    imgUrl: "/images/bougie.webp",
  },
  {
    id: 6,
    title: "Porte-magazine",
    price: 45,
    link: "/ads/porte-magazine",
    imgUrl: "/images/porte-magazine.webp",
  },
];

export function RecentAds(): React.ReactNode {
  const [ads, setAds] = useState([] as AdCardProps[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleRedirect = (id: number) => {
    console.log(id);
    window.location.href = "/ads/new/" + id;
  };

  function addToTotal(price: number) {
    const newTotalPrice = price + totalPrice;
    setTotalPrice(newTotalPrice);
  }

  async function getAllRecendsAds() {
    try {
      const res = await axios.get(`${API_URL}/ads`);
      console.log(res.data);
      setAds(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllRecendsAds();
  }, []);

  const handleDeleteAds = async (id: number) => {
    console.log(id);
    try {
      const res = await axios.delete(`${API_URL}/ads/${id}`);
      const refreshAd = ads.filter((ad) => ad.id !== id);
      setAds(refreshAd);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditAd = async (id: number) => {
    console.log(id);
    try {
      const res = await axios.patch(`${API_URL}/ads/${id}`);
      const refreshAd = ads.find((ad) => ad.id === id);
      if (refreshAd) {
        let path = `/ads/${id}`;
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                  className="buton"
                  onClick={() => handleRedirect(item.id)}
                >
                  Modifier l'annonce
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => handleDeleteAds(item.id)}
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
