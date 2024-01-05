import { _COLORS } from "@/utils/constants";
import Link from "next/link";

export type CategoryType = {
  id: number;
  name: string;
};

export type CategoryProps = CategoryType;

export function Category(props: CategoryProps): React.ReactNode {
  return (
    <Link href={`/category/${props.id}`} className="text-green-900">
      {props.name}
    </Link>
  );
}
