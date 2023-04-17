import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Component from '../lib';

export default {
    title: 'Storybook/Component',
    component: Component,
    parameters: {
      // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  } as ComponentMeta<typeof Component>;

  const Template: ComponentStory<typeof Component> = (props) => <Component {...props}/>;

export const ComponentExample = Template.bind({});
ComponentExample.args = {
  productList: [{
    id: 1,
    name: 'Upload new pictures'
  },
  {
    id: 2,
    name: 'Pay rent'
  },
  {
    id: 3,
    name: 'Go Shopping'
  },
  {
    id: 4,
    name: 'Call friends'
  },
  {
    id: 5,
    name: 'Read books'
  }]
};