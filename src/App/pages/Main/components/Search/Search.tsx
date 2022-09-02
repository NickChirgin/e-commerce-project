import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';

import searchStyle from './Search.module.scss';

type SearchProps = {
  length: number;
};

const Search: React.FC<SearchProps> = ({ length }) => {
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
          />
        </div>
        <MultiDropdown options={[]} value={[]} text="Filter" />
      </div>
      <div className={searchStyle.products}>
        <h3>Total Products</h3>
        <p>{length}</p>
      </div>
    </div>
  );
};

export default Search;
