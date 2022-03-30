import React from "react";
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const {setDay, name, spots, selected} = props;
  const dayClass = classNames('day-list__item', {
    'day-list__item--full': !spots,
    'day-list__item--selected': selected
  });

  return (
    <li data-testid='day' className={dayClass} onClick={setDay}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots(spots)}</h3>
    </li>
  );
}

const formatSpots = (spots) => {
  switch(spots) {
  case 0:
    return 'no spots remaining';
  case 1:
    return '1 spot remaining';
  default:
    return `${spots} spots remaining`;
  };
};