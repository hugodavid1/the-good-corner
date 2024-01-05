import React, { useState } from "react";
import { AdCard, AdType } from "./AdCard";
import {
  mutationDeleteAd,
  AdById,
  queryAllAds,
  //   queryAllAdsCount,
} from "@/graphql/ads";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import { Button } from "flowbite-react";
import { TbBasketPlus } from "react-icons/tb";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import { _COLORS } from "@/utils/constants";

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
};

export function RecentAds(props: RecentAdsProps): React.ReactNode {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAdsCount, setTotalAdsCount] = useState();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const { data } = useQuery<{ items: AdType[]; count: number }>(queryAllAds, {
    variables: {
      where: {
        ...(props.categoryId ? { categoryIn: [props.categoryId] } : {}),
        ...(props.searchWord ? { searchTitle: props.searchWord } : {}),
      },
      skip: page * pageSize,
      take: pageSize,
    },
  });
  const ads = data ? data.items : [];
  const count = data ? data.count : 0;

  const pagesCount = Math.ceil(count / pageSize); /* nombre de page dispo */
  /* delete ad */
  const [doDelete] = useMutation(mutationDeleteAd, {
    refetchQueries: [queryAllAds],
  });

  /* get ad by id */
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

  // @ts-ignore
  // @ts-ignore
  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <h4>Montant de votre panier : {totalPrice}</h4>
      <section className="recent-ads">
        {ads.map((item, i) => (
          <div key={item.id} className="w-full mb-4">
            {" "}
            {/* Ajoutez une marge en bas si nécessaire */}
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
            <div className="row-button-ad flex flex-wrap mt-2">
              <Button
                pill
                size={"small"}
                className="bg-green-900"
                onClick={() => {
                  addToTotal(item.price);
                }}
                style={{
                  color: "white",
                }}
              >
                <TbBasketPlus className="h-8 w-8 px-1 mx-2 " />
                <div style={{ margin: "0 15px 0 0px" }}>Ajouter</div>
              </Button>
              <Button
                pill
                className="text-green-900"
                onClick={() => handleRedirectEdit(item.id)}
              >
                <div
                  style={{
                    border: `1px solid ${_COLORS.primary}`,
                    borderRadius: "25px",
                    padding: "7px",
                  }}
                >
                  <MdModeEditOutline className="h-6 w-6" />
                </div>
              </Button>
              <Button
                pill
                onClick={() => deleteAd(item.id)}
                style={{
                  color: _COLORS.primary,
                }}
              >
                <div
                  style={{
                    border: `1px solid ${_COLORS.primary}`,
                    borderRadius: "25px",
                    padding: "7px",
                  }}
                >
                  <AiFillDelete className="h-6 w-6" />
                </div>
              </Button>
            </div>
          </div>
        ))}
      </section>
      <Pagination
        setPage={setPage}
        page={page}
        setPageSize={setPageSize}
        pagesCount={pagesCount}
      />
    </main>
  );
}
