import { useState, useEffect } from 'react';

import CardList from '@components/CardList/';
import Header from '@components/Header';
import { CardsModel } from '@store/models/product/cards';
import { useQueryParamsStore } from '@store/RootStore/hooks/useQueryParamsStore';
import axios from 'axios';
import { observer } from 'mobx-react-lite';

import Search from './components/Search';

function Main() {
  useQueryParamsStore();
  const [data, setData] = useState<CardsModel[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://fakestoreapi.com/products',
      });
      setData(result.data);
    };
    fetch();
  }, []);
  return (
    <>
      <Header />
      <Search length={data.length} />
      <CardList products={data}></CardList>
    </>
  );
}

export default observer(Main);
