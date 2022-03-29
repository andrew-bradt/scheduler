import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData () {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev, 
        days: days.data, 
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    })
  }, []);
  
  const setDay = (day) => setState((prev) => ({...prev , day}));

  const updateSpots = (state, appointments) => {
    const stateForDay = state.days.find(day => day.name === state.day); 
    const appointmentsForDay = stateForDay.appointments.map(id => appointments[id]);
    const availableSpots = appointmentsForDay.filter(apt => !apt.interview).length;
    const updatedDay = {
      ...stateForDay,
      spots: availableSpots
    };
    const days = [...state.days];
    days[stateForDay.id - 1] = updatedDay;
  };
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    updateSpots(state, appointments);

    // const days = [...state.days];
    // days[dayID] = nextDayState;
    // console.log(days);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(()=>setState({...state, appointments}));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}));
  };

  return ({state, setDay, bookInterview, cancelInterview});
}