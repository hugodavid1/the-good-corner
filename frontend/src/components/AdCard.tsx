import { CategoryType } from "./Category";

export type AdType = {
  id: number;
  link: string;
  imgUrl: string;
  title: string;
  price: number;
  createdAt: string;
  description: string;
  category: CategoryType | null;
};

export type AdCardProps = AdType & {
  onDelete?: () => void;
};

export function AdCard(props: AdCardProps): React.ReactNode {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={props.link}>
        <img className="ad-card-image" src={props.imgUrl} />
        <div className="ad-card-text">
          <div className="ad-card-title">{props.title}</div>
          <div className="ad-card-price">{props.price} €</div>
        </div>
      </a>
    </div>
  );
}
