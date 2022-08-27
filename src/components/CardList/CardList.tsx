import Card from '@components/Card';

import cardListStyle from './CardList.module.scss';

export type Cards = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
};

export type CardsProps = {
  products: Cards[];
};

const CardList: React.FC<CardsProps> = ({ products }) => {
  return (
    <>
      <div className={cardListStyle.products__cardslist}>
        {products.map((product: Cards) => (
          <Card
            key={product.id}
            id={product.id}
            category={product.category}
            title={product.title}
            image={product.image}
            content={product.price}
            subtitle={product.description}
          />
        ))}
      </div>
    </>
  );
};

export default CardList;
