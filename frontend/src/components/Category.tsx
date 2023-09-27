export type CategoryProps = {
  id: number;
  name: string;
};

export function Category(props: CategoryProps): React.ReactNode {
  let categoryPath = "/category/" + props.name;
  return (
    <a href={`category/${props.id}`} className="category-navigation-link">
      {props.name}
    </a>
  );
}
