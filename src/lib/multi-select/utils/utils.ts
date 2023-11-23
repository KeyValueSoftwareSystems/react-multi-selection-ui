import { ElementsWithCallableStyle } from "../constants";
import { StyleProp } from "../types";

export const getStyles = (
  element: ElementsWithCallableStyle,
  styles: StyleProp,
  id: string | number
): object => {
  // id will be available for styles given to user as functions
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle(id);
  }
  return {};
};
