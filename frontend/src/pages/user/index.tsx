import { Layout } from "@/components/Layout";
import { getCurrentUser } from "@/graphql/users";
import { MeType } from "@/types";
import { useQuery } from "@apollo/client";
import React from "react";

const Me = () => {
  const { data, error, loading } = useQuery<{ item: MeType }>(getCurrentUser);
  // const me = error ? null : data?.me;
  return (
    <>
      <Layout title="Mon espace Admin">
        <div className="main-content">
          <div>{data?.item.email}</div>
        </div>
      </Layout>
    </>
  );
};

export default Me;
