// src/components/StationDash.stories.js
import React from 'react';
import StationDash from '../components/StationDash';

export default {
  title: 'Dashboard/StationDash',
  component: StationDash,
};

const Template = (args) => <StationDash {...args} />;

export const Default = Template.bind({});
Default.args = {};
