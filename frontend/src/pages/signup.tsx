import { mutationSignUp } from "@/graphql/users";
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

  const [doSignUp, { data, loading, error }] = useMutation(mutationSignUp);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSignUp({
      variables: {
        data: {
          email,
          password,
        },
      },
    }).then((res) => {
      if (res.data?.signup?.user?.id) {
        router.replace("/signin");
      }
      console.log(res);
    });
  };

  return (
    <>
      <div className="main-content">
        <h1 className="font-bold text-xl">The Good Corner</h1>
        <h2 className="font-semibold text-lg">S'inscrire</h2>
        <form className="flex max-w-md flex-col gap-4 mt-2" onSubmit={onSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              value={email}
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={password}
              required
            />
          </div>
          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
          <Button style={{ backgroundColor: _COLORS.primary }} type="submit">
            S'enregistrer
          </Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
