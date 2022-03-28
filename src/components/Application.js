import React, {useState, useEffect} from "react";
import axios from 'axios';

import DayList from './DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState((prev) => ({...prev, day}));
  const setDays = (days) => setState((prev) => ({...prev, days}));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments});
  };

  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev, 
        days: days.data, 
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const parsedAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id} 
        id = {appointment.id}
        time = {appointment.time}
        interview = {interview}
        interviewers = {interviewers}
        bookInterview = {bookInterview}
      />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList 
          days = {state.days}
          value = {state.day}
          onChange = {setDay}
        />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          parsedAppointments
        }
        <Appointment key='last' time='5pm'/>
      </section>
    </main>
  );
}
