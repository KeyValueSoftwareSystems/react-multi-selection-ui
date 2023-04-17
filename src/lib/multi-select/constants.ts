import { Map } from './types';
export const DEFAULT_SEARCH_PLACEHOLDER = 'Search products';

export const SELECTION_LIST = 'selectionList';

export const SELECTED_LIST = 'selectedList';

export const PRODUCT_UNSELECTED_STATUS = 'unselected';

export const PRODUCT_SELECTED_STATUS = 'selected';

export const PRODUCT_STATUS_CONVERSION: Map = {
  selected: PRODUCT_UNSELECTED_STATUS,
  unselected: PRODUCT_SELECTED_STATUS
}

export const DEFAULT_SELECTED_LIST_ZERO_STATE = 'You have not added any products!';

export const DEFAULT_SELECTION_LIST_ZERO_STATE = 'No products to show';

export enum Elements {
  SelectionListZeroState = 'SelectionListZeroState',
  SelectedListZeroState = 'SelectedListZeroState',
  SearchComponent = 'SearchComponent',
  ProductComponent = 'ProductComponent',
  SelectedComponent = 'SelectedComponent',
  SelectedCloseIcon = 'SelectedCloseIcon',
  Container = 'Container'
}