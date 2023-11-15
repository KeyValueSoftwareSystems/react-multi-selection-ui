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
      list?.map((item: OptionType): JSX.Element => (
        ((hideSelected && !selectedIds.includes(item.id)) || (!hideSelected)) && (
          <button
            key={item.id}
            className={classes.eachItem}
            onClick={(): void => onOptionClick(item.id)}
            style={getStyles(!selectedIds.includes(item.id) ? Elements.UnSelectedMenuItem :Elements.SelectedMenuItem, styles)}
            id={`option-card-${item.id}`}
            data-testid="option-card"
          >
            {showCheckbox && (
              selectedIds.includes(item.id)
                ? <div
                  className={`${classes.checkbox} ${classes.icon}`}
                  style={{ backgroundImage: `url(${icon})`, ...getStyles(Elements.CheckedIcon, styles)}}
                  id="checked-checkbox"
                />
                : <div className={`${classes.unchecked} ${classes.icon}`}  style={getStyles(Elements.UnCheckedIcon, styles)} id="unchecked-checkbox" />
            )}
            <div
              id="label">
              {item.name}
            </div>
          </button>
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