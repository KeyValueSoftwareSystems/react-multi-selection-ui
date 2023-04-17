  

# React Multi Selection UI

  

<a  href="https://www.npmjs.com/package/react-dot-matrix-chart"><img  src="https://badgen.net/npm/v/react-dot-matrix-chart?color=blue"  alt="npm version"></a>  <a  href="https://www.npmjs.com/package/react-dot-matrix-chart"  ><img  src="https://img.shields.io/npm/dw/react-dot-matrix-chart?label=Downloads"  /></a>  <a  href="https://github.com/KeyValueSoftwareSystems/react-dot-matrix-chart"><img  src="https://github.com/KeyValueSoftwareSystems/react-dot-matrix-chart/actions/workflows/deploy.yml/badge.svg"  alt=""  /></a>

  

<div  align="center">
<img  src="./screenshot.png"  alt=""  width="1591"  height="370"/>
</div>

  

>A customizable ready to use Multi Selection UI component with Search feature

  

Try tweaking a multi selection ui component using this codesandbox link <a  href="https://codesandbox.io/s/dot-matrix-chart-hqw9z0"  >here</a>

  

## Installation

  

The easiest way to use react-multi-selection-ui is to install it from npm and build it into your app with Webpack.

  

```bash

npm install  @keyvaluesystems/react-multi-selection-ui

```

You’ll need to install React separately since it isn't included in the package.  

## Usage

React Multi Selection UI can run in a very basic mode by just providing the `productList` like given below:

  

```jsx

import  MultiSelection  from  '@keyvaluesystems/react-multi-selection-ui';

<MultiSelection
  productList={productListArray}
/>

```

  

The productList is an array of objects with the following keys:

  

-  `id` - a unique identifier for each product

-  `name` - a string that represents each product

An example for productList array is shown below:

  

```jsx
const  productListArray = [
  {
    id:  1,
    name:  'Product 1'
  },
  {
    id:  2,
    name:  'Product 2'
  }
]
```

You can use `hideSearch` prop to hide/show the search feature in the selection list (left menu).
With the help of `showCheckbox` prop, the checkbox near the selection list can be shown/hidden.
`searchPlaceholder` gives an option to customise the placeholder shown inside the Search text box.
 
```jsx
<MultiSelection
 productList={productListArray}
 hideSearch={false}
 showCheckbox={true}
 searchPlaceholder="Search"
/>
```

  

You can specify whether to show or hide the selected values in the selection list(left list) with the help of `hideSelected` prop.

Zero-states can be customised for both list using `zeroState` prop. We can provide JSX elements for both selected list and selection list in this.

```jsx
<MultiSelection
 productList={productListArray}
 hideSelected={true}
/>
```
## Props

  Props that can be passed to the component are listed below:

<table>
<thead>
<tr>
<th>Prop</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code><b>productList:</b> object[]</code></td>
<td>
An array of product objects to specifying the id and name of each product
</td>
<td><code>[]</code></td>
</tr>
<tr>
<td><code><b>showCheckbox?:</b> boolean</code></td>
<td>
The boolean value to control the display of checkbox in the selection list
</td>
<td><code>true</code></td>
</tr>
<tr>
<td><code><b>searchPlaceholder?:</b> string</code></td>
<td>
The placeholder value for the search text box
</td>
<td><code>true</code></td>
</tr>
<tr>
<td><code><b>hideSelected?:</b> boolean</code></td>
<td>
The boolean value to control the display of selected values in the selected list(right list)
</td>
<td><code>'Search products'</code></td>
</tr>
<tr>
<td><code><b>hideSearch?:</b> boolean</code></td>
<td>
The boolean value to control the display of search text box in the selection list
</td>
<td><code>false</code></td>
</tr>
<tr>
<td><code><b>hideSelected?:</b> boolean</code></td>
<td>
The boolean value to control the display of selected values in the selected list(right list)
</td>
<td><code>false</code></td>
</tr>
<tr>
<td><code><b>zeroState?:</b> object</code></td>
<td>
To specify the zerostate components to be rendered in both lists
</td>
<td><code>{selectionList: undefined, selectedList: undefined}</code></td>
</tr>
<tr>
<td><code><b>onSearch?:</b> function</code></td>
<td>
The callback function which will be triggered on text change in the search box
</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td><code><b>setSelectedValues?:</b> function</code></td>
<td>
The callback function which will be triggered on the selection of product list values. Can be used for obtaining the selected values
</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td><code><b>styles?:</b> object</code></td>
<td>
Provides you with a bunch of callback functions to override the default styles.
</td>
<td><code>undefined</code></td>
</tr>
</tbody>
</table>

## Style Customizations


All the default styles provided by this package are overridable using the `style` prop.
the below code shows all the overridable styles:

```jsx
<DotMatrix
 dataPoints={dataPointsArray}
 styles={{
	SelectionListZeroState?: () =>  ({...styles}),
	SelectedListZeroState?: () =>  ({...styles}),
	SearchComponent?: () =>  ({...styles}),
	ProductComponent?: () =>  ({...styles}),
	SelectedComponent?: () =>  ({...styles}),
	SelectedCloseIcon?: () =>  ({...styles}),
	Container?: () =>  ({...styles})
 }}
/>
```
-  `Container` - overrides the multi selection ui container style
-  `SelectionListZeroState` - overrides the selection list zero state container
-  `SelectedListZeroState` - overrides the selected list zero state container
-  `SearchComponent` - overrides the search component styles
-  `ProductComponent` - overrides the selection component (left list)
-  `SelectedComponent` - overrides the selected component(right list)
-  `SelectedCloseIcon` - overrides the selected component close icon