import { FormEvent, useEffect, useState } from "react";
import { CategoryType } from "./Category";
import { useMutation, useQuery } from "@apollo/client";
import { queryAllCategories } from "@/graphql/categories";
import { mutationCreateAd, mutationUpdateAd, queryAllAds } from "@/graphql/ads";
import { AdType } from "./AdCard";
import { useRouter } from "next/router";
import { findAllTags } from "@/graphql/tags";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import Link from "next/link";

export type AdFormData = {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: { id: number } | null;
  tags: [{ id: number }] | []; // A vérifier lors de la création/modif car c'est une many to many
};

type AdFormProps = {
  ad?: AdType;
};

type TagType = {
  id: number;
  name: string;
};

export default function FormAd(props: AdFormProps) {
  const router = useRouter();
  const [error, setError] = useState<"title" | "price">();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [tagsId, setTagsId] = useState<null | number>(null);
  const {
    data: dataCategory,
    error: errorCategory,
    loading: loadingCategory,
  } = useQuery<{ allCategories: CategoryType[] }>(queryAllCategories);
  const categories = dataCategory?.allCategories || [];
  const {
    data: dataTags,
    error: tagsError,
    loading: tagsLoading,
  } = useQuery<{ items: TagType[] }>(findAllTags);
  const tags = dataTags?.items || [];

  const [doCreate, { loading: createLoading }] = useMutation(mutationCreateAd, {
    refetchQueries: [queryAllAds],
  });
  const [doUpdate, { loading: updateLoading }] = useMutation(mutationUpdateAd, {
    refetchQueries: [queryAllAds],
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const data: AdFormData = {
      title,
      description,
      imgUrl,
      price,
      category: categoryId ? { id: Number(categoryId) } : null,
      tags: [],
    };

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      if (!props.ad) {
        const result = await doCreate({
          variables: {
            data: data,
          },
        });
        console.log(result);
        if ("id" in result.data?.item) {
          router.replace(`/ads/${result.data.item.id}`);
        }
      } else {
        const result = await doUpdate({
          variables: {
            id: props.ad?.id,
            data: data,
          },
        });
        if (!result.errors?.length) {
          router.replace(`/ads/${props.ad.id}`);
        }
      }
    }
  }

  useEffect(() => {
    if (props.ad) {
      setTitle(props.ad.title);
      // @ts-ignore
      setDescription(props.ad.description);
      setPrice(props.ad.price);
      setImgUrl(props.ad.imgUrl);
      setCategoryId(props.ad.category ? props.ad.category.id : null);
    }
  }, [props.ad]);

  return (
    <>
      <main className="main-content">
        <>
          {error === "price" && <p>Le prix doit être positif</p>}
          {error === "title" && (
            <p>Le titre est requis et doit faire plus de 3 caractères</p>
          )}
          <div className="form-container">
            <h2 className="font-semibold text-xl mb-4 text-green-900">
              {props.ad
                ? `Modifier l'offre ${props.ad?.id}`
                : "Créer une offre"}
            </h2>
            {/* <form onSubmit={onSubmit} className="form-ad">
              <input
                type="text"
                className="text-field-form"
                name="title"
                placeholder="Titre de l'annonce"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
              className="text-field-form"
                type="text"
                name="description"
                placeholder="Description de l'annonce"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
              className="text-field-form"
                type="text"
                name="imgUrl"
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
                name="category"
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
              <select
                name="tags"
                value={tagsId + ""}
                className="text-field-form"
                onChange={(e) => setTagsId(Number(e.target.value))}
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="button-form">
                {props.ad ? "Modifier" : "Créer"}
              </button>
            </form> */}
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Votre titre" />
                </div>
                <TextInput
                  type="text"
                  name="title"
                  placeholder="Titre de l'annonce"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Votre description" />
                </div>
                <TextInput
                  type="text"
                  name="description"
                  placeholder="Description de l'annonce"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="imgUrl" value="Votre image" />
                </div>
                <TextInput
                  type="text"
                  name="imgUrl"
                  placeholder="Lien de l'image"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Votre prix" />
                </div>
                <TextInput
                  type="number"
                  name="price"
                  placeholder="0,00€"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="category" value="Votre catégorie" />
                </div>
                <Select
                  name="category"
                  value={categoryId + ""}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tags" value="Votre tag" />
                </div>
                <Select
                  name="tags"
                  value={tagsId + ""}
                  onChange={(e) => setTagsId(Number(e.target.value))}
                >
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </Select>
              </div>
              <Button type="submit" className="bg-green-900">
                {props.ad ? "Modifier" : "Créer"}
              </Button>
            </form>
          </div>
        </>
      </main>
    </>
  );
}
