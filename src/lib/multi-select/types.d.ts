export interface MultiSelectPropType {
  productList: eachProductType[],
  showCheckbox?: boolean,
  hideSelected?: boolean,
  hideSearch?: boolean,
  onSearch?: (value: string) => void,
  setSelectedValues?: (values: eachProductType[]) => {},
  searchPlaceholder?: string,
  zeroState?: {
    selectionList: JSX.Element,
    selectedList: JSX.Element
  },
  styles?: StyleProp
}

export type eachProductType = {
  name: string,
  id: string | number,
  status?: string
}

export type SearchComponentPropType = {
  onSearch: (value: string) => void,
  searchPlaceholder: string,
  styles?: StyleProp
}

export interface ListWrapperPropType {
  children: JSX.Element
}

export interface SelectionListPropType extends MultiSelectPropType {
  list: eachProductType[],
  setList: (val: eachProductType[]) => void,
  zeroStateComponent: JSX.Element | undefined

}

export interface Map {
  [key: string]: string | undefined
}

export interface SelectedListPropType {
  list: eachProductType[],
  setList: (val: eachProductType[]) => void,
  zeroStateComponent: JSX.Element | undefined,
  styles?: StyleProp
}

export type StyleProp = {
  SelectionListZeroState?: () => object,
  SelectedListZeroState?: () => object,
  SearchComponent?: () => object,
  ProductComponent?: () => object,
  SelectedComponent?: () => object,
  SelectedCloseIcon?: () => object,
  Container?: () => object
}