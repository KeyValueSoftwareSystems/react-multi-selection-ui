import React from 'react';
import { getStyles } from './utils/utils';
import { ModalProps, OptionType } from './types';
import { Elements, DEFAULT_LOADER_TEXT, DEFAULT_EMPTY_LIST_MESSAGE } from './constants';
import classes from './styles.module.scss';

const OptionListingModal = (props: ModalProps):JSX.Element => {
  const {
    list,
    selectedIds,
    hideSelected,
    showCheckbox,
    icon,
    isLoading,
    renderEmptyItem,
    renderLoader,
    onOptionClick,
    styles = {}
  } = props;

  return (
    <>
    {list.length && (list.length !== selectedIds.length || !hideSelected) ?
      list?.map((item: OptionType, listIndex: number): JSX.Element => (
        ((hideSelected && !selectedIds.includes(item.id)) || (!hideSelected)) && (
          <div
            key={item.id}
            className={classes.eachItem}
            onClick={(): void => onOptionClick(item.id)}
            style={getStyles(!selectedIds.includes(item.id) ? Elements.UnSelectedMenuItem :Elements.SelectedMenuItem, styles)}
            id={`item-${listIndex}`}
          >
            {showCheckbox && (
              selectedIds.includes(item.id)
                ? <div
                  className={`${classes.checkbox} ${classes.icon}`}
                  style={{ backgroundImage: `url(${icon})`, ...getStyles(Elements.CheckedIcon, styles)}}
                />
                : <div className={`${classes.unchecked} ${classes.icon}`}  style={getStyles(Elements.UnCheckedIcon, styles)}/>
            )}
            <div
              id={`name-${listIndex}`}>
              {item.name}
            </div>
          </div>
        )
      ) || <></>)
      :
      (!isLoading && (renderEmptyItem ||
      <div
        className={classes.emptyList}
      >
        <div>{DEFAULT_EMPTY_LIST_MESSAGE}</div>
      </div>
      ))}
      {isLoading && (
        renderLoader || (
          <div
            className={classes.loader}
          >
            {DEFAULT_LOADER_TEXT}
          </div>
        )
      )}
    </>
  )
};

export default OptionListingModal;