import { useEffect } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import MainPageStore from '@store/MainPageStore';
import useLocalStore from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';

import searchStyle from './Search.module.scss';

type SearchProps = {
  length: number;
};

const Search: React.FC<SearchProps> = ({ length }) => {
  const mainPageStore = useLocalStore(() => new MainPageStore());
  useEffect(() => {
    mainPageStore.getCategories();
  }, [mainPageStore]);
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
            onClick={() => {}}
          />
        </div>
        <MultiDropdown
          options={mainPageStore.categories}
          value={[]}
          text={'Filter'}
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
