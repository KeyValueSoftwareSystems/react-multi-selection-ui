import React, { useMemo } from 'react';
import closeIcon from '../../assets/x.svg';
import { ChipListPropType, OptionType } from './types';
import { Elements  } from './constants';
import { getStyles } from './utils/utils';
import classes from './styles.module.scss';

const Chips = (props : ChipListPropType) : JSX.Element => {
  const {
    list,
    onClick,
    styles = {},
    icon,
    thresholdForBubble = 0,
    showAllChips
  } = props;


  const chipsToShow = useMemo(()=>{
    if(!thresholdForBubble || showAllChips || thresholdForBubble === list?.length) return list;
    else return list.slice(0, thresholdForBubble);
  },[list, thresholdForBubble, showAllChips]);

  const hiddenChipsCount = thresholdForBubble ?? 0 > 0 ? list?.length - thresholdForBubble : 0

  return (
    <>
      {chipsToShow?.map(
        (item: OptionType): JSX.Element => (
          <div
            key={item.id}
            className={classes.chip}
            style={getStyles(Elements.ChipComponent, styles)}
            id="chip"
          >
            <div id={`selected-chip-${item.id}`}>
              {item.name}
            </div>
            <button
            id={`chip-close-${item.id}`}
            className={classes.buttonIcon}
            onClick={(): void => onClick(item.id)}>
              <img src={icon ?? closeIcon} alt='' className={classes.chipClose} style={getStyles(Elements.ChipCloseIcon, styles)}/>
            </button>
          </div>
        ))}
        {!showAllChips&& !!thresholdForBubble && list?.length  > thresholdForBubble && (
          <button id="hidden-chip-count" className={`${classes.buttonIcon} ${classes.hiddenChipsCount}`} style={getStyles(Elements.HiddenChipsIndicator, styles)}>
            +{hiddenChipsCount}
          </button>
        )}
    </>
  )
}

export default Chips;