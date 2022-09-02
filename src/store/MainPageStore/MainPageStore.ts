import { API_ENDPOINTS } from '@config/api';
import { CardsApi, CardsModel } from '@store/models/product/cards';
import rootStore from '@store/RootStore';
import { ILocalStore } from '@utils/useLocalStore';
import axios from 'axios';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';

type PrivateFields = '_categories' | '_isLoading' | '_products';

export default class MainPageStore implements ILocalStore {
  private _products: CardsModel[] = [];
  private _categories: string[] = [];
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<MainPageStore, PrivateFields>(this, {
      _isLoading: observable,
      _categories: observable.ref,
      _products: observable.ref,
      products: computed,
      categories: computed,
      loading: computed,
      getCategories: action,
    });
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

  async getCategories(): Promise<void> {
    this._categories = [];
    const categories = await axios({
      method: 'get',
      url: API_ENDPOINTS.CATEGORIES,
    });
    runInAction(() => (this._categories = categories.data));
  }

  private readonly _searchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    async (search) => {
      // eslint-disable-next-line no-console
      console.log(search);
      const result = await axios({
        method: 'get',
        url: 'https://fakestoreapi.com/products',
      });
      runInAction(() => {
        this._products = result.data.filter((product: CardsApi) =>
          product.title.includes(search as string)
        );
      });
    }
  );

  async getProducts(): Promise<void> {}
  destroy(): void {
    this._searchReaction();
  }
}
