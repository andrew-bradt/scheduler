import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const {time, id, interview} = props;
  
  return (
    <article className='appointment'>
      <Header time = {time}/>
      {(interview) ? <Show/> : <Empty/>}
    </article>
  );
}