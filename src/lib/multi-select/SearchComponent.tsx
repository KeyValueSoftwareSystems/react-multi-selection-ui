import React, { useEffect, useState } from 'react';
import { getStyles } from './utils/utils';
import { SearchComponentPropType } from './types';
import { Elements } from './constants';
import searchIcon from '../../assets/Search.svg';
import closeIcon from '../../assets/x-circle.svg';
import classes from './styles.module.scss';

const SearchComponent = (props: SearchComponentPropType):JSX.Element => {
  const {
    onSearch,
    searchPlaceholder,
    styles = {}
  } = props;
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);
  return (
    <div
      className={classes.searchContainer}
      style={getStyles(Elements.SearchComponent, styles)}
    >
      <div
        className={classes.imageDiv}
        style={{backgroundImage: `url(${searchIcon})`}}
      />
      <input
        type="text"
        onChange={(e): void => setSearchTerm(e.target.value)}
        value={searchTerm}
        id="search-component"
        placeholder={searchPlaceholder}
      />
      {searchTerm && (
        <div
          className={classes.closeIcon}
          style={{backgroundImage: `url(${closeIcon})`}}
          onClick={():void => setSearchTerm('')}
        />
      )}
    </div>
  )
};

export default SearchComponent;