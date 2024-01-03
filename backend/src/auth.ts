import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<{ req: any; res: any }> = (
  { root, args, context, info },
  roles
) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    console.error("No token found");
    return false;
  }
  try {
    const decoded = jwt.verify(
      token,
      "b8c6f697-deb0-44a5-92c7-397b7bc4ef81"
    ) as { exp: number; UserId: number };
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
