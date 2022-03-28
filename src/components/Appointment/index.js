import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  const {time, id, interview, interviewers, bookInterview} = props;
  const {mode, transition, back} = useVisualMode((interview) ? SHOW : EMPTY);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
    transition(SHOW);
  };

  return (
    <article className='appointment'>
      <Header time = {time}/>
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)}/> }
      {mode === SHOW && (
        <Show 
          student = {interview.student} 
          interviewer = {interview.interviewer} 
        />
      )}
      {mode === CREATE && <Form interviewers = {interviewers} onCancel = {back} onSave={save}/>}
    </article>
  );
}