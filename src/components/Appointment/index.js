import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  const {time, id, interview, interviewers, bookInterview, cancelInterview} = props;
  const {mode, transition, back} = useVisualMode((interview) ? SHOW : EMPTY);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(()=> transition(SHOW));
  };

  const onReqDelete = () => transition(CONFIRM); 

  const onConfirmDelete = () => {
    transition(SAVING);
    cancelInterview(id)
      .then(()=>transition(EMPTY));
  };

  return (
    <article className='appointment'>
      <Header time = {time}/>
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)}/> }
      {mode === SHOW && (
        <Show 
          student = {interview.student} 
          interviewer = {interview.interviewer} 
          onDelete = {onReqDelete}
        />
      )}
      {mode === CREATE && <Form interviewers = {interviewers} onCancel = {back} onSave={save}/>}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm message='Are you sure you would like to delete?' onConfirm = {onConfirmDelete} onCancel = {back}/>}
    </article>
  );
}