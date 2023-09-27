import { CategoryProps } from "@/components/Category";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

const NewAdPage = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, []);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    axios
      .post(`${API_URL}/ads`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout title="Ajout d'une annonce">
      <div className="main-content">
        <form onSubmit={onSubmit}>
          <h1>Ajout d'une nouvelle annonce</h1>
          <div className="form-row">
            <div className="input-label">
              <label htmlFor="title">Titre de l'annonce</label>
              <input
                type="text"
                id="title"
                name="title"
                className="text-field"
              />
            </div>
            <div className="input-label">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="text-field"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-label">
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                id="price"
                name="price"
                className="text-field"
              />
            </div>
            <div className="input-label">
              <label htmlFor="imgUrl">Image</label>
              <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                className="text-field"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-label">
              <label htmlFor="category">Catégorie</label>
              <select name="category" id="category" className="text-field">
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-label">
              {/* @TODO ajouter un boutton pour les tags */}
              <label htmlFor="button">Submit</label>
              <button className="button">Ajouter une nouvelle annonce</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewAdPage;
