import { useState, useEffect } from 'react';

import CardList from '@components/CardList';
import { Cards } from '@components/CardList/CardList';
import Header from '@components/Header';
import Search from '@components/Search';
import axios from 'axios';

function Main() {
  const [data, setData] = useState<Cards[]>([]);
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

export default Main;
