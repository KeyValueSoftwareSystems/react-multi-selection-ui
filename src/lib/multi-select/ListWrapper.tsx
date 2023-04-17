import React from 'react';
import { ListWrapperPropType } from './types';
import classes from './styles.module.scss';

const ListWrapper = (props: ListWrapperPropType): JSX.Element => (
  <div className={classes.listWrapper}>
    {props.children}
  </div>
)

export default ListWrapper