/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo } from 'react';
import SearchComponent from './SearchComponent';
import {
  SelectionListPropType,
  eachProductType
} from './types';
import { getStyles } from './utils/utils';
import {
  DEFAULT_SEARCH_PLACEHOLDER,
  PRODUCT_UNSELECTED_STATUS,
  PRODUCT_STATUS_CONVERSION,
  PRODUCT_SELECTED_STATUS,
  DEFAULT_SELECTION_LIST_ZERO_STATE,
  Elements
} from './constants';
import zeroState from '../../assets/selectionListZeroState.svg';
import selectedImage from '../../assets/State=Selected.svg';
import classes from './styles.module.scss';

const SelectionList = (props: SelectionListPropType): JSX.Element => {
  const {
    productList,
    onSearch = undefined,
    showCheckbox = true,
    searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
    list,
    hideSelected = false,
    setList,
    zeroStateComponent,
    styles = {},
    hideSearch = false
  } = props;

  const isItemsPresentInList = useMemo(() => (
    list?.length > 0 && ((hideSelected && list.filter((e) => !e.status || e.status === PRODUCT_UNSELECTED_STATUS)?.length > 0) || !hideSelected)
  ), [list]);
  const searchValue = (value: string): void => {
    if (onSearch) {
      onSearch(value);
      return;
    }
    const products = [...productList];
    setList(products.filter((e) => e.name.indexOf(value) !== -1));
  }

  const changeStatus = (index: number): void => {
    const listOfProducts = [...list];
    const product = { ...listOfProducts[index]};
    const { status = PRODUCT_UNSELECTED_STATUS } = product;
    product.status = (PRODUCT_STATUS_CONVERSION)[status];
    listOfProducts.splice(index, 1, product);
    setList(listOfProducts);
  };
  return (
    <div className={classes.selectionListContainer}>
      {!hideSearch && <SearchComponent
        onSearch={searchValue}
        searchPlaceholder={searchPlaceholder}
        styles={styles}
      />}
      <div
        className={classes.listContainer}
      >
        {(isItemsPresentInList && list?.map((item: eachProductType, listIndex: number): JSX.Element => (
          ((hideSelected && item?.status !== PRODUCT_SELECTED_STATUS) || (!hideSelected)) && (
            <div
              key={item.id}
              className={`${classes.eachItem} ${item.status === PRODUCT_SELECTED_STATUS && classes.activeItem}`}
              onClick={(): void => changeStatus(listIndex)}
              style={getStyles(Elements.ProductComponent, styles)}
              id={`selection-product-${listIndex}`}
            >
              {showCheckbox && <div>
                <input
                  type="checkbox"
                  checked={item.status === PRODUCT_SELECTED_STATUS}
                  onChange={():void => {}}
                  id="product-selection-checkbox"
                  style={(item.status === PRODUCT_SELECTED_STATUS && { content: `url(${selectedImage})`}) || {}}
                />
              </div>}
              <div
                id="product-card">
                {item.name}
              </div>
            </div>
          )) || (<></>))) || (zeroStateComponent ||
          <div
            className={classes.zeroState}
            style={getStyles(Elements.SelectionListZeroState, styles)}
          >
            <div
              className={classes.zeroStateImage}
              style={{backgroundImage: `url(${zeroState})`}}
            />
            <div>{DEFAULT_SELECTION_LIST_ZERO_STATE}</div>
          </div>
        )}
      </div>
    </div>
  )
};

export default SelectionList;