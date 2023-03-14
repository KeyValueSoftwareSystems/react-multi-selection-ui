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

  const Template: ComponentStory<typeof Component> = () => <Component />;

export const ComponentExample = Template.bind({});
ComponentExample.args = {
  steps: [{
    label: 'Jane Doe',
  }],
};