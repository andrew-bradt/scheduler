import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

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
      .then(()=> transition(SHOW))
      .catch(()=>transition(ERROR_SAVE));
  };

  const onEdit = () => transition(EDIT);
  const onReqDelete = () => transition(CONFIRM); 

  const onConfirmDelete = () => {
    transition(DELETING);
    cancelInterview(id)
      .then(()=>transition(EMPTY))
      .catch(()=>transition(ERROR_DELETE));
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
          onEdit = {onEdit}
        />
      )}
      {mode === CREATE && <Form interviewers = {interviewers} onCancel = {back} onSave={save}/>}
      {mode === EDIT && (<Form 
        student = {interview.student} 
        interviewers = {interviewers}
        interviewer = {interview.interviewer.id}
        onCancel = {back}
        onSave = {save}
        />)
      }
      {mode === CONFIRM && <Confirm message='Are you sure you would like to delete?' onConfirm = {onConfirmDelete} onCancel = {back}/>}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_SAVE && <Error message='Error Saving'/>}
      {mode === ERROR_DELETE && <Error message='Error Deleting' />}
    </article>
  );
}