import { routes } from '@config/routes';
import { Link } from 'react-router-dom';

import cardStyle from './Card.module.scss';

export type CardProps = {
  id: number;
  image: string;
  category?: string;
  title: string;
  subtitle: string;
  content?: string;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  id,
  image,
  category,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div className={cardStyle.card} onClick={onClick}>
      <Link to={routes.product.createPath(id)}>
        <img src={image} alt="" className={cardStyle.card__image} />
      </Link>
      <p className={cardStyle.card__paragraph}>{category}</p>
      <Link
        to={routes.product.createPath(id)}
        className={cardStyle.card__title}
      >
        {title.slice(0, 20)}
      </Link>
      <p className={cardStyle.card__paragraph}>{subtitle.slice(0, 30)}</p>
      <p className={cardStyle.card__paragraph}>{`$${content}`}</p>
    </div>
  );
};

export default Card;
