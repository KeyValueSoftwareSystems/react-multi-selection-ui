import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "../lib";

export default {
  title: "MultiSelect",
  component: Component,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => (
  <Component {...props} />
);

export const WithDefaultProps = Template.bind({});
WithDefaultProps.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
    },
    {
      id: 2,
      name: "Pay rent",
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
    },
    {
      id: 5,
      name: "Read books",
    },
  ],
};

export const WithOptionalProps = Template.bind({});
WithOptionalProps.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
      checked: true,
    },
    {
      id: 2,
      name: "Pay rent",
      checked: false,
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
    },
    {
      id: 5,
      name: "Read books",
    },
  ],
  onSearch: undefined,
  styles: {
    Container: { width: "40%", padding: 20 },
    SearchComponent: { fontSize: 16 },
    SelectedMenuItem: () => ({
      fontSize: 18,
      color: "#000000",
      backgroundColor: "#D9E2F0",
    }),
    UnSelectedMenuItem: () => ({
      fontSize: 18,
      color: "#000000",
      backgroundColor: "#FFFFFF",
    }),
    ChipComponent: () => ({ backgroundColor: "#D9E2F0" }),
    HelperText: {},
    InputBox: { borderRadius: 0 },
    SearchIcon: { width: 20, height: 20 },
  },
  hideSelected: false,
  hasError: false,
  icons: {
    Search:
      "https://static-00.iconduck.com/assets.00/search-icon-2048x2048-zik280t3.png",
  },
};

export const LimitingNumberOfVisibleChips = Template.bind({});
LimitingNumberOfVisibleChips.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
      checked: true,
    },
    {
      id: 2,
      name: "Pay rent",
      checked: false,
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
      checked: true,
    },
    {
      id: 5,
      name: "Read books",
      checked: true,
    },
  ],
  onSearch: undefined,
  styles: {
    Container: { width: "40%", padding: 20 },
    SearchComponent: { fontSize: 16 },
    SelectedMenuItem: () => ({
      backgroundColor: "#D9E2F0",
    }),
    UnSelectedMenuItem: () => ({
      fontSize: 18,
      color: "#000000",
      backgroundColor: "#FFFFFF",
    }),
    ChipComponent: () => ({ backgroundColor: "#D9E2F0" }),
    HelperText: {},
    InputBox: { borderRadius: 0 },
    SearchIcon: { width: 20, height: 20 },
  },
  hideSelected: false,
  hasError: false,
  thresholdForBubble: 2,
  showCheckbox: false
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
      checked: true,
    },
    {
      id: 2,
      name: "Pay rent",
      checked: false,
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
    },
    {
      id: 5,
      name: "Read books",
    },
  ],
  onSearch: undefined,
  hideSelected: false,
  helperText: "This is a dummy helper text",
  styles: {
    HelperText: { textAlign: "right", paddingTop: 10 },
    Container: { width: "40%", paddingTop: 20 },
  },
};

export const WithError = Template.bind({});
WithError.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
      checked: true,
    },
    {
      id: 2,
      name: "Pay rent",
      checked: false,
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
    },
    {
      id: 5,
      name: "Read books",
    },
  ],
  onSearch: undefined,
  styles: {
    HelperText: { textAlign: "left", paddingTop: 10 },
    Container: { width: "40%", paddingTop: 20 },
  },
  hasError: true,
  helperText: "This is a dummy error",
};

export const AdjustingEachMenuItemStyle = Template.bind({});
AdjustingEachMenuItemStyle.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
      checked: true,
    },
    {
      id: 2,
      name: "Pay rent",
      checked: false,
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
    },
    {
      id: 5,
      name: "Read books",
    },
  ],
  onSearch: undefined,
  styles: {
    HelperText: { textAlign: "left", paddingTop: 10 },
    Container: { width: "40%", paddingTop: 20 },
    SelectedMenuItem: (id: number) => {
      if (id === 1)
        return {
          color: "red",
        };
      if (id === 2)
        return {
          color: "green",
        };
    },
    UnSelectedMenuItem: (id: number) => {
      if (id === 1)
        return {
          color: "red",
        };
      if (id === 2)
        return {
          color: "green",
        };
    },
    ChipComponent: (id: number) => {
      if (id === 1)
        return {
          backgroundColor: "red",
        };
      if (id === 2)
        return {
          backgroundColor: "yellow",
        };
    },
  },
};

export const WithLoadingBar = Template.bind({});
WithLoadingBar.args = {
  options: [
    {
      id: 1,
      name: "Upload new pictures",
      checked: true,
    },
    {
      id: 2,
      name: "Pay rent",
      checked: false,
    },
    {
      id: 3,
      name: "Go Shopping",
    },
    {
      id: 4,
      name: "Call friends",
    },
    {
      id: 5,
      name: "Read books",
    },
  ],
  hideSearch: true,
  onSearch: undefined,
  isLoading: true,
};
