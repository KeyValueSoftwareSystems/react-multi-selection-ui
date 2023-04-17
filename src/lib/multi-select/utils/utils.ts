import { Elements } from '../constants';
import { StyleProp } from '../types';

export const getStyles = (element: Elements, styles: StyleProp): object => {
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle();
  }
  return {};
};
