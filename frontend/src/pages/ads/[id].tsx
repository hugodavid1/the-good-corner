import { useRouter } from "next/router";
import { ads } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";

const AdDetailComponent = () => {
  const router = useRouter();
  const adId = router.query.id as string;
  let foundAd = null;

  for (const ad of ads) {
    if (ad.link.endsWith(adId)) {
      foundAd = ad;
      break;
    }
  }
  console.log(foundAd);

  return (
    <>
      <Layout title="Ad Detail">
        <p>Offre ID: {router.query.id}</p>
        {foundAd && (
          <>
            <h2>{foundAd.title}</h2>
            <p>{foundAd.price} €</p>
          </>
        )}
      </Layout>
    </>
  );
};

export default AdDetailComponent;
