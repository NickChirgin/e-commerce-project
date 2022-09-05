import { useEffect } from 'react';

import CardList from '@components/CardList/';
import Header from '@components/Header';
import leftarrow from '@img/leftarrow.svg';
import rightarrow from '@img/rightarrow.svg';
import MainPageStore from '@store/MainPageStore';
import rootStore from '@store/RootStore';
import { useQueryParamsStore } from '@store/RootStore/hooks/useQueryParamsStore';
import useLocalStore from '@utils/useLocalStore';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import Search from './components/Search';

function Main() {
  useQueryParamsStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const mainPageStore = useLocalStore(() => new MainPageStore());
  const currentPage = cn();
  const clickHandler = (page: number): void => {
    if (searchParams.get('search')) {
      setSearchParams({
        search: searchParams.get('search') as string,
        page: String(page),
      });
    } else {
      setSearchParams({
        page: String(page),
      });
    }
  };
  useEffect(() => {
    mainPageStore.getProductsWithFilter(
      searchParams.get('search'),
      searchParams.get('page'),
      mainPageStore.choosenCategories
    );
  }, [mainPageStore, searchParams]);
  return (
    <>
      <Header />
      <Search length={mainPageStore.products.length} store={mainPageStore} />
      <CardList products={mainPageStore.products}></CardList>
      <div>
        <img src={leftarrow} alt="left arrow" />
        <div>
          {mainPageStore.pagesAmount.map((page) => (
            <div key={page} onClick={() => clickHandler(page)}>
              {page}
            </div>
          ))}
        </div>
        <img src={rightarrow} alt="right arrow" />
      </div>
    </>
  );
}

export default observer(Main);
