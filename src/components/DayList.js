import React from 'react';
import DayListItem from './DayListItem';

export default function DayList (props) {
  const {days, setDay} = props;
  const parsedDays = days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={() => setDay(day.name)}
      />
    );
  });

  return parsedDays;
}