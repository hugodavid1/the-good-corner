import FormAd from "@/components/FormAd";
import { MeType } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { getCurrentUser } from "@/graphql/users";
import { useQuery } from "@apollo/client";
import { Spinner } from "flowbite-react";

const newAd = () => {
  const {
    data: UserData,
    error: UserError,
    loading: UserLoading,
  } = useQuery<{ me: MeType }>(getCurrentUser);
  const user = UserData?.me;
  console.log(user);
  if (UserLoading) {
    return;
    <Spinner color="warning" aria-label="Warning spinner example" />;
  }

  if (UserError) {
    return <p>Error</p>;
  }
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
