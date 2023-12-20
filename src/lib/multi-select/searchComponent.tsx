import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import searchIcon from "../../assets/Search.svg";
import defaultCloseIcon from "../../assets/x-circle.svg";
import { renderAsImage } from './utils/utils'
import { SearchComponentPropType } from "./types";
import { Elements } from "./constants";
import classes from "./styles.module.scss";

const SearchComponent = (
  props: SearchComponentPropType,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const { onSearch, searchPlaceholder, styles = {}, onFocus, icon, onCloseClick, closeIcon } = props;
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  const onCloseButtonClick = (): void =>{
    setSearchTerm("");
    if(onCloseClick) onCloseClick();
  }

  return (
    <div
      className={classes.searchContainer}
      style={styles[Elements.SearchComponent]}
    >
      {renderAsImage(icon)?
        <img
          src={icon as string ?? searchIcon}
          alt=""
          className={classes.chipClose}
          style={styles[Elements.SearchIcon]}
        />: icon}
      <input
        type="text"
        onChange={(e): void => setSearchTerm(e.target.value)}
        value={searchTerm}
        id="search-component"
        placeholder={searchPlaceholder}
        onFocus={onFocus}
        ref={ref}
        className={classes.searchInput}
      />
      {searchTerm && (
        <button
          id="clear-search-button"
          className={`${classes.buttonIcon} ${classes.icon}`}
          onClick={onCloseButtonClick}
        >
          {renderAsImage(closeIcon)?
            <img
              src={closeIcon as string ?? defaultCloseIcon}
              alt=""
              className={classes.chipClose}
              style={styles[Elements.ClearSearchIcon]}
            /> :
            closeIcon}
        </button>
      )}
    </div>
  );
};

export default forwardRef(SearchComponent);
