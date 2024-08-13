// src/components/StationCard.stories.js
import React from 'react';
import ServicesCard from '../components/ServicesCard';

export default {
  title: 'ServicesCard',
  component: ServicesCard,
};

const Template = (args) => <ServicesCard {...args} />;

export const Card1 = Template.bind({});
Card1.args = {
  imgurl : "https://thumbs.dreamstime.com/b/businessman-booking-appointment-via-smartphone-app-concept-illustration-businessman-booking-appointment-via-smartphone-app-212503921.jpg"
};

export const Card2 = Template.bind({});
Card2.args = {
  imgurl : "https://miro.medium.com/v2/resize:fit:828/format:webp/0*FkIL6VoLEff3vTai.jpg"
};
