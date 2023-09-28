import { useRouter } from "next/router";
import { ads } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";

const AdDetailComponent = () => {
  const router = useRouter();
  const id = router.query.id as string;
  let foundAd = null;

  for (const ad of ads) {
    if (ad.link.endsWith(id)) {
      foundAd = ad;
      break;
    }
  }
  console.log(foundAd);

  return (
    <>
      <Layout title="Ad Detail">
        <div className="main-content">
          <p>Offre ID: {router.query.id}</p>
          {foundAd && (
            <>
              <h2 className="ad-details-title">{foundAd.title}</h2>
              <section className="ad-details">
                <div className="ad-details-image-container">
                  <img className="ad-details-image" src="/images/table.webp" />
                </div>
                <div className="ad-details-info">
                  <div className="ad-details-price">{foundAd.price}</div>
                  <div className="ad-details-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Non, iusto! Voluptates repudiandae asperiores quia.
                    Blanditiis repellat minima adipisci, aliquam nulla unde quam
                    architecto eligendi, voluptatum, perspiciatis laudantium sed
                    eos voluptates?
                  </div>
                  <hr className="separator" />
                  <div className="ad-details-owner">
                    Annoncée publiée par <b>Serge</b> aujourd'hui (9:32).
                  </div>
                  <a
                    href="mailto:serge@serge.com"
                    className="button button-primary link-button"
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                    >
                      <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
                    </svg>
                    Envoyer un email
                  </a>
                </div>
              </section>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AdDetailComponent;
