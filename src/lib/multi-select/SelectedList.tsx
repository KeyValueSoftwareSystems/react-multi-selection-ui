import React, { useMemo } from 'react';
import { SelectedListPropType, eachProductType } from './types';
import { DEFAULT_SELECTED_LIST_ZERO_STATE, Elements, PRODUCT_SELECTED_STATUS, PRODUCT_UNSELECTED_STATUS } from './constants';
import classes from './styles.module.scss';
import ZeroStateImage from '../../assets/emptystates.svg';
import closeIcon from '../../assets/x.svg';
import { getStyles } from './utils/utils';

const SelectedList = (props : SelectedListPropType) : JSX.Element => {
  const {
    list,
    setList,
    zeroStateComponent,
    styles = {}
  } = props;

  const changeItemStatus = (index: number): void => {
    const listOfItems = [...list];
    const currentItem = listOfItems[index];
    currentItem.status = PRODUCT_UNSELECTED_STATUS;
    listOfItems.splice(index, 1, currentItem);
    setList(listOfItems);
  };

  const isSelectedItemsPresent = useMemo(() => (
    list.filter((e) => e.status === PRODUCT_SELECTED_STATUS)?.length > 0
  ), [list]);
  return (
    <div className={classes.selectedListContainer}>
      {(isSelectedItemsPresent && list?.map(
        (item: eachProductType, itemIndex: number) => (item.status === PRODUCT_SELECTED_STATUS &&
          <div
            key={item.id}
            className={classes.eachSelectedItem}
            onClick={(): void => changeItemStatus(itemIndex)}
            style={getStyles(Elements.SelectedComponent, styles)}
          >
            <div id={`selected-product-${itemIndex}`}>
              {item.name}
            </div>
            <div
              className={classes.closeIcon}
              style={{
                ...getStyles(Elements.SelectedCloseIcon, styles),
                backgroundImage: `url(${closeIcon})`
              }}
            />
          </div>
        ))) || (zeroStateComponent ||
        <div
          className={classes.zeroState}
          style={getStyles(Elements.SelectedListZeroState, styles)}
        >
          <div className={classes.zeroStateImage} style={{backgroundImage: `url(${ZeroStateImage})`}} />
          <div>{DEFAULT_SELECTED_LIST_ZERO_STATE}</div>
        </div>
      )}
    </div>
  )
}

export default SelectedList;