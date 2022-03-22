import React from 'react';

import Button from '../Button';
import InterviewerList from 'components/InterviewerList';

export default function Form (props) {
  const {student, interviewer, interviewers, onSave, onCancel} = props;

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"

          />
        </form>
        <InterviewerList 
          interviewers = {interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger >Cancel</Button>
          <Button confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}