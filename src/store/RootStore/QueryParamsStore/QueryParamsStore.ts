import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  private _filter: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable.ref,
      search: computed,
      setSearch: action,
      setFilter: action,
    });
  }

  setSearch(search: string): void {
    search = search.startsWith('?') ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  get search(): string {
    return this._search;
  }

  setFilter(filter: string): void {
    filter = filter.startsWith('?') ? filter.slice(1) : filter;
    if (this._filter !== filter) {
      this._filter = filter;
      this._params = qs.parse(filter);
    }
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }
}