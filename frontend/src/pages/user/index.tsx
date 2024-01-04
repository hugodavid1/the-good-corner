import { MeType } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { getCurrentUser } from "@/graphql/users";
import { useQuery } from "@apollo/client";
import React from "react";

const Me = () => {
  const { data, error, loading } = useQuery<{ me: MeType }>(getCurrentUser);
  // const me = error ? null : data?.me;
  return (
    <>
      <Layout title="Mon espace Admin">
        <div className="main-content">
          <div>{data?.me.email}</div>
        </div>
      </Layout>
    </>
  );
};

export default Me;
