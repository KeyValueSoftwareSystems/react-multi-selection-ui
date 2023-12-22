import React, { useMemo } from "react";
import CheckMark from "../../assets/CheckBox.svg";
import { getStyles, renderAsImage } from "./utils/utils";
import { ModalProps, OptionType } from "./types";
import {
  DEFAULT_EMPTY_LIST_MESSAGE,
  DEFAULT_LOADER_TEXT,
  Elements,
  ElementsWithCallableStyle
} from "./constants";
import classes from "./styles.module.scss";

const OptionListingModal = (props: ModalProps): JSX.Element => {
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

  const showDefault = useMemo(()=> renderAsImage(icon), [icon]);

  return (
    <>
      {list?.length && (list.length !== selectedIds.length || !hideSelected)
        ? list?.map(
          (item: OptionType): JSX.Element =>
            (((hideSelected && !selectedIds.includes(item.id)) ||
                !hideSelected) && (
              <button
                key={item.id}
                className={`${classes.eachItem} ${selectedIds.includes(item.id) && classes.selectedItem}`}
                onClick={(): void => onOptionClick(item.id)}
                style={getStyles(
                  !selectedIds.includes(item.id)
                    ? ElementsWithCallableStyle.UnSelectedMenuItem
                    : ElementsWithCallableStyle.SelectedMenuItem,
                  styles,
                  item.id
                )}
                id={`option-card-${item.id}`}
                data-testid="option-card"
              >
                {showCheckbox &&
                    (selectedIds.includes(item.id) ? (
                      showDefault ?
                        <div
                          className={`${classes.checkbox} ${classes.icon}`}
                          style={{
                            backgroundImage: `url(${icon ?? CheckMark})`,
                            ...styles[Elements.CheckedIcon]
                          }}
                          id="checked-checkbox"
                        />
                        : icon
                    ) : (
                      <div
                        className={`${classes.unchecked} ${classes.icon}`}
                        style={styles[Elements.UnCheckedIcon]}
                        id="unchecked-checkbox"
                      />
                    ))}
                <div id="label">{item.name}</div>
              </button>
            )) || <React.Fragment key={item.id}/>
        )
        : !isLoading &&
          (renderEmptyItem || (
            <div className={classes.emptyList}>
              <div>{DEFAULT_EMPTY_LIST_MESSAGE}</div>
            </div>
          ))}
      {isLoading &&
        (renderLoader || (
          <div className={classes.loader}>{DEFAULT_LOADER_TEXT}</div>
        ))}
    </>
  );
};

export default OptionListingModal;
