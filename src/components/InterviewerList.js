import React from 'react';
import 'components/InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList (props) {
  const {interviewers, value, onChange} = props;
  const parsedInterviewers = interviewers.map(element => {
    return (
      <InterviewerListItem 
        key = {element.id}
        name = {element.name}
        avatar = {element.avatar}
        selected = {element.id === value}
        setInterviewer = {() => onChange(element.id)}
      />
    );
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}