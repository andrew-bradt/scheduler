import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

export default function Appointment(props) {
  const {time, id, interview} = props;
  const {mode, transition, back} = useVisualMode((interview) ? SHOW : EMPTY);

  return (
    <article className='appointment'>
      <Header time = {time}/>
      {mode === EMPTY && <Empty /> }
      {mode === SHOW && (
        <Show 
          student = {interview.student} 
          interviewer = {interview.interviewer} 
        />
      )}
    </article>
  );
}