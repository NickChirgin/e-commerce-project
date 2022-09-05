import { api } from '@config/api';
import { API_ENDPOINTS, itemsPerPage } from '@config/endpoint';
import { CardsModel } from '@store/models/product/cards';
import rootStore from '@store/RootStore';
import range from '@utils/range';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';

type PrivateFields =
  | '_categories'
  | '_isLoading'
  | '_products'
  | '_pagesAmount'
  | '_choosenCategories';

export default class MainPageStore implements ILocalStore {
  private _products: CardsModel[] = [];
  private _categories: string[] = [];
  private _isLoading: boolean = false;
  private _pagesAmount: number[] = [];
  private _choosenCategories: string[] = [];
  constructor() {
    makeObservable<MainPageStore, PrivateFields>(this, {
      _isLoading: observable,
      _categories: observable.ref,
      _products: observable.ref,
      _pagesAmount: observable.ref,
      _choosenCategories: observable.ref,
      products: computed,
      categories: computed,
      loading: computed,
      setCategories: action.bound,
      getCategories: action.bound,
      getInitProducts: action.bound,
      getProductsWithFilter: action.bound,
    });
  }

  get pagesAmount(): number[] {
    return this._pagesAmount;
  }

  get products(): CardsModel[] {
    return this._products;
  }

  get loading(): boolean {
    return this._isLoading;
  }

  get categories(): string[] {
    return this._categories;
  }

  get choosenCategories(): string[] {
    return this._choosenCategories;
  }

  setCategories(cats: string[]) {
    this._choosenCategories = cats;
  }

  async getCategories(): Promise<void> {
    this._categories = [];
    const categories = await api.get(API_ENDPOINTS.CATEGORIES);
    runInAction(() => (this._categories = categories.data));
  }

  async getInitProducts(): Promise<void> {
    this._products = [];
    const products = await api.get(API_ENDPOINTS.PRODUCTS);
    runInAction(() => {
      this._pagesAmount = range(1, products.data.length, itemsPerPage);
      this._products = products.data.slice(0, itemsPerPage);
    });
  }

  async getProductsWithFilter(
    filter: string | null,
    page: string | number | null,
    categories: string[]
  ): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(filter, page, categories);
    const products = await api.get(API_ENDPOINTS.PRODUCTS);
    runInAction(() => {
      this._products = products.data;
      this._pagesAmount = range(1, this._products.length, itemsPerPage);
    });
    if (categories) {
      runInAction(() => {
        this._products = this._products.filter((product) =>
          categories.includes(product.category)
        );
        this._pagesAmount = range(1, this._products.length, itemsPerPage);
      });
    }

    if (filter) {
      // eslint-disable-next-line no-console
      console.log(this._products);
      runInAction(() => {
        this._products = this._products.filter((product: CardsModel) => {
          return product.title.toLowerCase().includes(filter.toLowerCase());
        });
        this._pagesAmount = range(1, this._products.length, itemsPerPage);
      });
    }
    if (page) {
      this._products = this._products.slice(
        (Number(page) - 1) * itemsPerPage,
        Number(page) * itemsPerPage
      );
    } else {
      this.getInitProducts();
    }
  }

  // private readonly _searchFilter: IReactionDisposer = reaction(
  //   () => rootStore.query.getParam('search'),
  //   async (search) =>
  //     await this.getProductsWithFilter(
  //       search as string,
  //       rootStore.query.getParam('?page') as string,
  //       this._choosenCategories
  //     )
  // );

  // private readonly _page: IReactionDisposer = reaction(
  //   () => rootStore.query.getParam('?page'),
  //   async (page) =>
  //     await this.getProductsWithFilter(
  //       rootStore.query.getParam('search') as string,
  //       page as string,
  //       this._choosenCategories
  //     )
  // );

  // private readonly _categoryFilter: IReactionDisposer = reaction(
  //   () => this._choosenCategories,
  //   async (categories) =>
  //     await this.getProductsWithFilter(
  //       rootStore.query.getParam('search') as string,
  //       rootStore.query.getParam('?page') as string,
  //       categories
  //     )
  // );

  destroy(): void {
    // this._searchFilter();
    // this._page();
    // this._categoryFilter();
  }
}
// getProduct (если !фильтер и !страница то getInitProduct else getProductsWithFilter) функция которую передать в useeffect , а в реакцию пихнуть getProductsWithFilter
