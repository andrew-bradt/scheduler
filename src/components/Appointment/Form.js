import React, {useState} from 'react';

import Button from '../Button';
import InterviewerList from 'components/InterviewerList';

export default function Form (props) {
  const {interviewers, onSave, onCancel} = props;
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = () => {
    reset();
    onCancel();
  };

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit = {(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange = {(e) => setStudent(e.target.value)}
            value={student}
          />
        </form>
        <InterviewerList 
          interviewers = {interviewers}
          value = {interviewer}
          onChange = {setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick = {cancel}>Cancel</Button>
          <Button confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}