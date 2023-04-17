import React from 'react';
import {
  render,
  queryByAttribute,
  fireEvent,
  queryAllByAttribute
} from '@testing-library/react';
import MultiSelect from '../multi-select';
import { MultiSelectPropType } from '../multi-select/types';

const getById = queryByAttribute.bind(null, 'id');
const getAllById = queryAllByAttribute.bind(null, 'id');

test("If Search is rendered in Selection List", async () => {
  const props: MultiSelectPropType = {
    productList: [{
      id: 1,
      name: 'Product 1'
    },
    {
      id: 2,
      name: 'Product 2'
    }]
  }
  const dom = render(<MultiSelect {...props} />);
  const searchComponent = await getById(dom.container, 'search-component');
  if (!searchComponent) throw Error('No Search component rendered');
});

test('If Search component is not rendered on passing prop', async () => {
  const props: MultiSelectPropType = {
    productList: [{
      id: 1,
      name: 'Product 1'
    },
    {
      id: 2,
      name: 'Product 2'
    }],
    hideSearch: true
  }
  const dom = render(<MultiSelect {...props} />);
  const searchComponent = await getById(dom.container, 'search-component');
  if (searchComponent) throw Error('Search component rendered');
});

test('If checkbox is rendered in selection test', async () => {
  const props: MultiSelectPropType = {
    productList: [{
      id: 1,
      name: 'Product 1'
    },
    {
      id: 2,
      name: 'Product 2'
    }]
  };
  const dom = render(<MultiSelect {...props} />);
  const allCheckboxes = await getAllById(dom.container, 'product-selection-checkbox');
  expect(allCheckboxes.length).toBe(2);
});

test('If checkbox not rendered if prop given', async () => {
  const props: MultiSelectPropType = {
    productList: [{
      id: 1,
      name: 'Product 1'
    },
    {
      id: 2,
      name: 'Product 2'
    }],
    showCheckbox: false
  };
  const dom = render(<MultiSelect {...props} />);
  const allCheckboxes = await getAllById(dom.container, 'product-selection-checkbox');
  expect(allCheckboxes.length).toBe(0);
});

test('If search is working', async () => {
  const props: MultiSelectPropType = {
    productList: [{
      id: 1,
      name: 'Product 1'
    },
    {
      id: 2,
      name: 'Product 2'
    }]
  };
  const dom = render(<MultiSelect {...props} />);
  const searchComponent = await getById(dom.container, 'search-component');
  fireEvent.change(searchComponent, { target: { value: 'Product 1'}});
  const product = await getAllById(dom.container, 'product-card');
  expect(product[0].innerHTML).toBe('Product 1');
})

test("If selected item is moved to the other list", async () => {
  const props: MultiSelectPropType = {
    productList: [{
      id: 1,
      name: 'Product 1'
    },
    {
      id: 2,
      name: 'Product 2'
    }]
  };
  const dom = render(<MultiSelect {...props} />);
  const firstElem = await getById(dom.container, 'selection-product-0');
  fireEvent.click(firstElem);
  const selectedProd = await getById(dom.container, 'selected-product-0');
  if (!selectedProd) throw Error('No items in selected list');
  expect(selectedProd.innerHTML).toBe('Product 1');
})