import { ElementsWithCallableStyle } from "../constants";
import { StyleProp } from "../types";

export const getStyles = (
  element: ElementsWithCallableStyle,
  styles: StyleProp,
  id: string | number
): object => {
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle(id);
  }
  return {};
};

export const renderAsImage = (icon?: JSX.Element | string): boolean => typeof icon === 'undefined' || typeof icon === 'string'