import { useEffect, useState } from "react";
import { CategoryType } from "./Category";
import axios from "axios";
import { API_URL } from "@/config";

export type AdFormData = {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: { id: number } | null;
};

export type FormAdProps = {
  initialData?: AdFormData;
  onSubmit: (data: AdFormData) => void;
  buttonText: string;
};

const FormAd: React.FC<FormAdProps> = ({
  initialData = {
    title: "",
    description: "",
    imgUrl: "",
    price: 0,
    category: null,
  },
  onSubmit,
  buttonText,
}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [hasBeenSent, setHasBeenSent] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  //   Fetching categorie from API
  async function fetchCategories() {
    const result = await axios.get<CategoryType[]>(`${API_URL}/categories`);
    setCategories(result.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: AdFormData = {
      title,
      description,
      imgUrl,
      price,
      category: categoryId ? { id: categoryId } : null,
    };

    // Vous pouvez maintenant appeler onSubmit avec data comme argument
    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      onSubmit(data);
    }

    // ... le reste de votre code pour handleSubmit
  };

  return (
    <>
      <main className="main-content">
        {hasBeenSent ? (
          <p>C'est OK</p>
        ) : (
          <>
            {error === "price" && <p>Le prix doit être positif</p>}
            {error === "title" && (
              <p>Le titre est requis et doit faire plus de 3 caractères</p>
            )}
            <div className="form-container">
              <form onSubmit={handleFormSubmit} className="form-ad">
                <input
                  type="text"
                  name="title"
                  className="text-field-form"
                  placeholder="Titre de l'annonce"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="text"
                  name="description"
                  className="text-field-form"
                  placeholder="Description de l'annonce"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <input
                  type="text"
                  name="imgUrl"
                  className="text-field-form"
                  placeholder="Lien de l'image"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />

                <input
                  type="number"
                  name="price"
                  className="text-field-form"
                  placeholder="0,00€"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />

                <select
                  name="categoryId"
                  value={categoryId + ""}
                  className="text-field-form"
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="button-form">
                  {buttonText}
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default FormAd;
