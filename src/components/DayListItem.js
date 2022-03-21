import React from "react";
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--full': !props.spots,
    'day-list__item--selected': props.selected
  });

  return (
    <li className = {dayClass} onClick = {() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{props.spots} Spots Remaining</h3>
    </li>
  );
}