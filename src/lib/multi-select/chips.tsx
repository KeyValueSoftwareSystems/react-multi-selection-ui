import React, { MouseEvent, useMemo } from "react";
import closeIcon from "../../assets/x.svg";
import { ChipListPropType, OptionType } from "./types";
import { Elements, ElementsWithCallableStyle } from "./constants";
import { getStyles } from "./utils/utils";
import classes from "./styles.module.scss";

const Chips = (props: ChipListPropType): JSX.Element => {
  const {
    list,
    onClick,
    styles = {},
    icon,
    thresholdForBubble = 0,
    showAllChips,
  } = props;

  const chipsToShow = useMemo(() => {
    if (
      !thresholdForBubble ||
      showAllChips ||
      thresholdForBubble === list?.length
    )
      return list;
    else return list.slice(0, thresholdForBubble);
  }, [list, thresholdForBubble, showAllChips]);

  const hiddenChipsCount =
    thresholdForBubble > 0 ? list?.length - thresholdForBubble : 0;

  return (
    <>
      {chipsToShow?.map(
        (item: OptionType): JSX.Element => (
          <div
            key={item.id}
            className={classes.chip}
            style={getStyles(
              ElementsWithCallableStyle.ChipComponent,
              styles,
              item.id
            )}
            id="chip"
          >
            <div id={`selected-chip-${item.id}`}>{item.name}</div>
            <button
              id={`chip-close-${item.id}`}
              className={`${classes.buttonIcon} ${classes.elevatedContent}`}
              onClick={(e: MouseEvent<HTMLButtonElement>): void =>
                onClick(e, item.id)
              }
            >
              <img
                src={icon ?? closeIcon}
                alt=""
                className={classes.chipClose}
                style={styles[Elements.ChipCloseIcon]}
              />
            </button>
          </div>
        )
      )}
      {!showAllChips &&
        !!thresholdForBubble &&
        list?.length > thresholdForBubble && (
          <button
            id="hidden-chip-count"
            className={`${classes.buttonIcon} ${classes.hiddenChipsCount}`}
            style={styles[Elements.HiddenChipsIndicator]}
          >
            +{hiddenChipsCount}
          </button>
        )}
    </>
  );
};

export default Chips;
