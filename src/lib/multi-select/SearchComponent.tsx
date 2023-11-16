import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import searchIcon from "../../assets/Search.svg";
import closeIcon from "../../assets/x-circle.svg";
import { getStyles } from "./utils/utils";
import { SearchComponentPropType } from "./types";
import { Elements } from "./constants";
import classes from "./styles.module.scss";

const SearchComponent = (
  props: SearchComponentPropType,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const { onSearch, searchPlaceholder, styles = {}, onFocus, icon } = props;
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div
      className={classes.searchContainer}
      style={getStyles(Elements.SearchComponent, styles)}
    >
      <img
        src={icon || searchIcon}
        alt=""
        className={classes.chipClose}
        style={getStyles(Elements.SearchIcon, styles)}
      />
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
          style={{ backgroundImage: `url(${closeIcon})` }}
          onClick={(): void => setSearchTerm("")}
        />
      )}
    </div>
  );
};

export default forwardRef(SearchComponent);
