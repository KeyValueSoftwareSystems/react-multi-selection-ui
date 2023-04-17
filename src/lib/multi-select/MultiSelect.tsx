import React, { useState, useEffect } from 'react';
import ListWrapper from './ListWrapper';
import SelectionList from './SelectionList';
import SelectedList from './SelectedList';
import { getStyles } from './utils/utils';
import { Elements } from './constants';
import { MultiSelectPropType, eachProductType } from './types';
import classes from './styles.module.scss';

const MultiSelect = (props: MultiSelectPropType): JSX.Element => {

  const {
    productList,
    zeroState = { selectedList: undefined, selectionList: undefined},
    styles = {}
  } = props;
  const [list, setList] = useState<eachProductType[]>([]);
  const { selectionList, selectedList } = zeroState;

  useEffect(() => {
    setList(productList);
  }, [productList]);

  return (
    <div
      className={classes.container}
      style={getStyles(Elements.Container, styles)}
    >
      <ListWrapper>
        <SelectionList
          {...props}
          list={list}
          setList={setList}
          zeroStateComponent={selectionList}
        />
      </ListWrapper>
      <ListWrapper>
        <SelectedList
          styles={styles}
          list={list}
          setList={setList}
          zeroStateComponent={selectedList}
        />
      </ListWrapper>
    </div>
  )
};

export default MultiSelect;