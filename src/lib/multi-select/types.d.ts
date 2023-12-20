import { MouseEvent } from "react";
export interface MultiSelectPropType {
  options: OptionType[];
  showCheckbox?: boolean;
  placeholder?: string;
  hideSelected?: boolean;
  hideSearch?: boolean;
  styles?: StyleProp;
  showChips?: boolean;
  dropdownMaxHeight?: string | number;
  renderEmptyItem?: JSX.Element;
  isLoading?: boolean;
  renderLoader?: JSX.Element;
  hasError?: boolean;
  helperText?: string;
  thresholdForBubble?: number;
  icons?: IconsProps;
  onSearch?: (value: string) => void;
  onItemClick?: (id: string | number) => void;
  setSelectedValues?: (ids: Array<string | number>) => void;
  clearSearchClick?: () => void;
}

export type OptionType = {
  name: string;
  id: string | number;
  checked?: boolean;
};

export type SearchComponentPropType = {
  searchPlaceholder: string;
  styles?: StyleProp;
  showChips?: boolean;
  icon?: string | JSX.Element;
  onFocus: () => void;
  onSearch: (value: string) => void;
  onCloseClick?:() => void,
  closeIcon?: string | JSX.Element
};

export interface ChipListPropType {
  list: OptionType[];
  styles?: StyleProp;
  icon?: string | JSX.Element;
  onClick: (event: MouseEvent<HTMLButtonElement>, id: string | number) => void;
  thresholdForBubble?: number;
  showAllChips: boolean;
}

export type StyleProp = {
  SelectedMenuItem?: (id: string | number) => object;
  UnSelectedMenuItem?: (id: string | number) => object;
  ChipComponent?: (id: string | number) => object;
  Container?: object;
  SearchComponent?: object;
  InputBox?: object;
  HelperText?: object;
  CheckedIcon?: object;
  UnCheckedIcon?: object;
  ChipCloseIcon?: object;
  SearchIcon?: object;
  ArrowIcon?: object;
  HiddenChipsIndicator?: object;
  ClearSearchIcon?: object;
};

export type IconsProps = {
  Search?: string | JSX.Element;
  ChipClose?: string | JSX.Element;
  Checked?: string | JSX.Element;
  Arrow?: string | JSX.Element;
  ClearSearch?: string | JSX.Element;
};

export type ModalProps = {
  list: OptionType[];
  selectedIds: (string | number)[];
  hideSelected: boolean;
  showCheckbox: boolean;
  icon?: string | JSX.Element;
  isLoading: boolean;
  renderEmptyItem?: JSX.Element;
  renderLoader?: JSX.Element;
  onOptionClick: (id: string | number) => void;
  styles?: StyleProp;
};
