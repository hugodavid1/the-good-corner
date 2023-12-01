import FormCategory from "@/components/FormCategory";
import { Layout } from "@/components/Layout";
import { Button } from "flowbite-react";
import React from "react";

const newCategory: React.FC = () => {
  return (
    <Layout title="Créer une annonce">
      <div className="main-content">
        <h2 className="text-4xl font-bold dark:text-white">
          Créer une catégorie
        </h2>
        <FormCategory />
      </div>
    </Layout>
  );
};

export default newCategory;
