import React from "react";
import {
  render,
  queryByAttribute,
  fireEvent,
  queryAllByAttribute,
  getAllByTestId,
} from "@testing-library/react";
import MultiSelect from "../multi-select";
import { MultiSelectPropType } from "../multi-select/types";

const getById = queryByAttribute.bind(null, "id");
const getAllById = queryAllByAttribute.bind(null, "id");

test("If Search is rendered", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "Option 1",
      },
      {
        id: 2,
        name: "Option 2",
      },
    ],
  };
  const dom = render(<MultiSelect {...props} />);
  const searchComponent = await getById(dom.container, "search-component");
  if (!searchComponent) throw Error("No Search component rendered");
});

test("If Search component is not rendered on passing prop", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "Option 1",
      },
      {
        id: 2,
        name: "Option 2",
      },
    ],
    hideSearch: true,
  };
  const dom = render(<MultiSelect {...props} />);
  const searchComponent = await getById(dom.container, "search-component");
  if (searchComponent) throw Error("Search component rendered");
});

test("If checkbox is rendered in the list", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "Option 1",
      },
      {
        id: 2,
        name: "Option 2",
      },
    ],
  };
  const dom = render(<MultiSelect {...props} />);
  const firstElem = await getById(dom.container, "down-arrow");
  fireEvent.click(firstElem);
  const allCheckboxes = await getAllById(dom.container, "unchecked-checkbox");
  expect(allCheckboxes.length).toBe(2);
});

test("If checkbox not rendered if prop given", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "Product 1",
      },
      {
        id: 2,
        name: "Product 2",
      },
    ],
    showCheckbox: false,
  };
  const dom = render(<MultiSelect {...props} />);
  const firstElem = await getById(dom.container, "down-arrow");
  fireEvent.click(firstElem);
  const allCheckboxes = await getAllById(dom.container, "unchecked-checkbox");
  expect(allCheckboxes.length).toBe(0);
});

test("If search is working with case sensitive search term", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
  };
  const dom = render(<MultiSelect {...props} />);
  const firstElem = await getById(dom.container, "down-arrow");
  fireEvent.click(firstElem);
  const searchComponent = await getById(dom.container, "search-component");
  fireEvent.change(searchComponent, { target: { value: "Upload" } });
  const product = await getAllByTestId(dom.container, "option-card");
  expect(product.length).toBe(1);
});

test("If default checked value is true ", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
        checked: true,
      },
      {
        id: 2,
        name: "download",
      },
    ],
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  const product = await getAllById(dom.container, "checked-checkbox");
  expect(product.length).toBe(1);
});

test("If onSearch handler is passed ", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
        checked: true,
      },
      {
        id: 2,
        name: "download",
      },
    ],
    onSearch: () => {},
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  const searchComponent = await getById(dom.container, "search-component");
  fireEvent.change(searchComponent, { target: { value: "Upload" } });
  const product = await getAllByTestId(dom.container, "option-card");
  expect(product.length).toBe(2);
});

test("If close button on search bar is clicked ", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
        checked: true,
      },
      {
        id: 2,
        name: "download",
      },
    ],
    onSearch: () => {},
  };
  const dom = render(<MultiSelect {...props} />);
  const firstElem = await getById(dom.container, "down-arrow");
  fireEvent.click(firstElem);
  const searchComponent = await getById(dom.container, "search-component");
  fireEvent.change(searchComponent, { target: { value: "Upload" } });
  const clearButton = await getById(dom.container, "clear-search-button");
  fireEvent.click(clearButton);
  const product = await getAllByTestId(dom.container, "option-card");
  expect(product.length).toBe(2);
});

test("If checkbox is clicked to add and remove an item from chips list by clicking menu item", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
    onItemClick: () => {},
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  const menuItem = await getById(dom.container, "option-card-1");
  fireEvent.click(menuItem);
  const addedChip = await getById(dom.container, "selected-chip-1");
  if (!addedChip) throw Error("Chip is not found");
  fireEvent.click(menuItem);
  const option = await getById(dom.container, "selected-chip-1");
  if (option) throw Error("chip found");
});

test("If close button is clicked to remove an item from chips list", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
    onItemClick: () => {},
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  const menuItem = await getById(dom.container, "option-card-1");
  fireEvent.click(menuItem);
  const close = await getById(dom.container, "chip-close-1");
  fireEvent.click(close);
  const option = await getById(dom.container, "selected-chip-1");
  if (option) throw Error("chip found");
});

test("If helperText prop is passed", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
    helperText: "dummy text",
    hasError: true,
    styles: {
      HelperText: { color: "#00000 " },
    },
  };
  const dom = render(<MultiSelect {...props} />);
  const textComponent = await getById(dom.container, "helper-text");
  if (!textComponent) throw Error("Helper text component not found");
});

test("If thresholdForBubble prop is passed", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
    thresholdForBubble: 1,
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  const menuItem1 = await getById(dom.container, "option-card-1");
  fireEvent.click(menuItem1);
  const menuItem2 = await getById(dom.container, "option-card-2");
  fireEvent.click(menuItem2);
  const countComponent = await getById(dom.container, "hidden-chip-count");
  if (!countComponent) throw Error("Remaining count is not displayed");
});

test("If clicked somewhere on the window", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
    thresholdForBubble: 1,
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  fireEvent.mouseDown(document);

  const menu = await getById(dom.container, "menulist");
  expect(menu).toBeFalsy();
});

test("If clicked somewhere on the window", async () => {
  const props: MultiSelectPropType = {
    options: [
      {
        id: 1,
        name: "upload",
      },
      {
        id: 2,
        name: "download",
      },
    ],
    thresholdForBubble: 1,
  };
  const dom = render(<MultiSelect {...props} />);
  const arrowComponent = await getById(dom.container, "down-arrow");
  fireEvent.click(arrowComponent);
  const menuItem1 = await getById(dom.container, "option-card-1");
  fireEvent.click(menuItem1);
  const menuItem2 = await getById(dom.container, "option-card-2");
  fireEvent.click(menuItem2);
  fireEvent.mouseDown(arrowComponent);
  const chips = await getAllById(dom.container, "chip");
  expect(chips.length).toBe(2);
  fireEvent.mouseDown(document);
  const chipsAfterHiding = await getAllById(dom.container, "chip");
  expect(chipsAfterHiding.length).toBe(1);
});
