import React, { useEffect } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import MainPageStore from '@store/MainPageStore';
import rootStore from '@store/RootStore';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import searchStyle from './Search.module.scss';

type SearchProps = {
  length: number;
  store: MainPageStore;
};
// {
//   store.getProductsWithFilter(searchParams.get('search'));
// }

const Search: React.FC<SearchProps> = ({ length, store }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    store.getCategories();
  }, [store]);
  const clickHandler = async (e: any) => {
    setSearchParams({
      ...searchParams,
      search: e.target.previousSibling?.value,
      page: '1',
    });
    store.getProductsWithFilter(
      searchParams.get('search'),
      searchParams.get('page'),
      store.choosenCategories
    );
  };
  const changer = (option: string) => {
    const newValues = store.choosenCategories.filter((city) => city !== option);
    if (newValues.length === store.choosenCategories.length)
      newValues.push(option);
    store.setCategories(newValues);
  };
  return (
    <div className={searchStyle.search__wrapper}>
      <div className={searchStyle.page}>
        <h1 className={searchStyle.page__title}>Products</h1>
        <p className={searchStyle.page__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
      </div>
      <div className={searchStyle.search}>
        <div className={searchStyle.search__product}>
          <Input
            value="Search property"
            className={searchStyle.search__product_input}
          />
          <Button
            children={window.innerWidth < 1000 ? 'Search' : 'Find Now'}
            className={searchStyle.search__product_button}
            onClick={clickHandler}
          />
        </div>
        <MultiDropdown
          options={store.categories}
          value={store.choosenCategories}
          text={
            store.choosenCategories !== []
              ? store.choosenCategories.join(',')
              : 'Filter'
          }
          onChange={(value: string) => changer(value)}
        />
      </div>
      <div className={searchStyle.products}>
        <h3>Total Products</h3>
        <p>{length}</p>
      </div>
    </div>
  );
};

export default observer(Search);
