import {
  getCurrentUser,
  mutationSignIn,
  mutationSignUp,
} from "@/graphql/users";
import { _COLORS } from "@/utils/constants";
import { useMutation } from "@apollo/client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

// Vérifier la redirection
function SignUp(): React.ReactNode {
  const router = useRouter();
  const [email, setEmail] = useState<string>("hugodvd5@outlook.com");
  const [password, setPassword] = useState<string>("superSecretPassword");
  const [remember, setRemember] = useState<boolean>(false);

  const [doSignUp, { data, loading, error }] = useMutation(mutationSignIn, {
    refetchQueries: [getCurrentUser],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSignUp({
      variables: {
        email,
        password,
      },
    }).then((res) => {
      if (res.data?.item) {
        router.replace("/");
      }
    });
  };

  return (
    <>
      <div className="main-content">
        <div className="flex justify-center">
          <form
            className="flex max-w-md flex-col gap-4 mt-2  w-full"
            onSubmit={onSubmit}
          >
            <div className="w-96 flex justify-center">
              <img className="w-96" src="./images/tgc.png" />
            </div>
            <div>
              <h2 className="font-semibold text-xl mt-4 text-green-900">
                Se connecter
              </h2>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Votre email" />
              </div>
              <TextInput
                id="email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Votre mot de passe" />
              </div>
              <TextInput
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
              />
            </div>

            <Button className="bg-green-900" type="submit">
              S'enregistrer
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
