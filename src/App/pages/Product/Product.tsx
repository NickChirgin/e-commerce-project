import { useEffect, useState } from 'react';

import Button from '@components/Button';
import { ButtonColor } from '@components/Button/Button';
import Card from '@components/Card';
import { Cards } from '@components/CardList/CardList';
import Header from '@components/Header';
import { API_ENDPOINTS } from '@config/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import productStyle from './Product.module.scss';

const Product: React.FC = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<Cards>({} as Cards);
  const [relatedProductData, setRelatedProductData] = useState<Cards[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios({
        method: 'get',
        url: `${API_ENDPOINTS.PRODUCT}${id}`,
      });
      setProductData(product.data);
      const relatedItems = await axios({
        method: 'get',
        url: `${API_ENDPOINTS.CATEGORY}${product.data.category}?limit=3`,
      });
      setRelatedProductData(relatedItems.data);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className={productStyle.productPage}>
      <Header />
      <div className={productStyle.product}>
        <img src={productData.image} alt={productData.title} />
        <div className={productStyle.product__info}>
          <p className={productStyle.product__info_title}>
            {productData.title}
          </p>
          <p className={productStyle.product__info_subtitle}>
            Combination of wood and wool
          </p>
          <p className={productStyle.product__info_color}>Color</p>
          <div className={productStyle.product__info_colors}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className={productStyle.product__info_description}>
            {productData.description}
          </p>
          <p className={productStyle.product__info_price}>
            {'$' + productData.price}
          </p>
          <div className={productStyle.product__info_buttons}>
            <Button children="Buy Now" />
            <Button children="Add to Chart" color={ButtonColor.secondary} />
          </div>
        </div>
      </div>
      <div className={productStyle.product__related}>
        <p className={productStyle.product__related_title}>Related Items</p>
        <div className={productStyle.product__related_items}>
          {relatedProductData.map((product: Cards) => (
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
      </div>
    </div>
  );
};

export default Product;
