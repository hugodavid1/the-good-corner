import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { User } from "./entities/User";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
};

export const customAuthChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles
) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    console.error("missing token");
    return false;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "supersecret");
    console.log(payload);
    if (typeof payload === "object" && "UserId" in payload) {
      const user = await User.findOneBy({ id: payload.UserId });

      if (user !== null) {
        context.user = Object.assign(user, { hashedPassword: undefined });
        return true;
      } else {
        console.error("user not found");
        return false;
      }
    } else {
      console.error("invalid token, msising userid");
      return false;
    }
  } catch {
    console.error("invalid token");
    return false;
  }
};
