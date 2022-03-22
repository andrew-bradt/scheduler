import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

export default function InterviewerListItem (props) {
  const {id, name, avatar, selected, setInterviewer} = props;
  const interviewerListItemClass = classNames('interviewers__item', {
    ' interviewers__item--selected': selected
  });
  const handleClick = (id) => setInterviewer(id);

  return (
    <li 
      className={interviewerListItemClass}
      key = {id}
      onClick = {() => handleClick(id)}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}