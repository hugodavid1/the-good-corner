import FormAd, { AdFormData } from "@/components/FormAd";
import { Layout } from "@/components/Layout";
import { mutationCreateAd, queryAllAds } from "@/graphql/ads";
import { useMutation } from "@apollo/client";

const newAd = () => {
  const [createAd, { loading, error }] = useMutation(mutationCreateAd, {
    refetchQueries: ["queryAllAds"],
  });

  const handleSubmit = async (adFormData: any) => {
    try {
      // Appel de la mutation avec les données du formulaire
      const response = await createAd({
        variables: {
          data: {
            title: adFormData.title,
            description: adFormData.description,
            imgUrl: adFormData.imgUrl,
            price: adFormData.price,
            category: adFormData.category
              ? { id: adFormData.category.id }
              : null,
            tags: [],
          }, // Les données du formulaire doivent être passées ici
        },
      });
      console.log(adFormData.cate);
      // Ici, vous pouvez rediriger l'utilisateur ou afficher un message de succès
    } catch (err) {
      console.error("Erreur lors de la création de l'annonce:", err);
      // Ici, vous pouvez gérer l'erreur, par exemple en affichant un message à l'utilisateur
    }
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
