import { API_ENDPOINTS } from '@config/api';
import { CardsModel, normalizeCards } from '@store/models/product/cards';
import { ILocalStore } from '@utils/useLocalStore';
import axios from 'axios';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type PrivateFields = '_relatedProducts' | '_isLoading' | '_product';

export default class ProductStore implements ILocalStore {
  private _product: CardsModel | null = null;
  private _relatedProducts: CardsModel[] = [];
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _isLoading: observable,
      _relatedProducts: observable.ref,
      _product: observable.ref,
      product: computed,
      relatedProducts: computed,
      loading: computed,
      getProducts: action,
    });
  }

  get product(): CardsModel | null {
    return this._product;
  }

  get loading(): boolean {
    return this._isLoading;
  }

  get relatedProducts(): CardsModel[] {
    return this._relatedProducts;
  }

  async getProducts(id: string | number | undefined): Promise<void> {
    this._isLoading = true;
    this._product = null;
    this._relatedProducts = [];
    const product = await axios({
      method: 'get',
      url: `${API_ENDPOINTS.PRODUCT}${id}`,
    });
    const relatedItems = await axios({
      method: 'get',
      url: `${API_ENDPOINTS.CATEGORY}${product.data.category}?limit=3`,
    });
    runInAction(() => {
      try {
        this._product = normalizeCards(product.data);
        this._relatedProducts = relatedItems.data.map(normalizeCards);
        this._isLoading = false;
      } catch (e) {
        this._isLoading = true;
        this._product = null;
        this._relatedProducts = [];
      }
    });
  }
  destroy(): void {}
}
