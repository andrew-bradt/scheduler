import {useEffect, useReducer} from 'react';
import axios from 'axios';

const SET_APPOINTMENT_DATA = 'SET_APPOINTMENT_DATA';
const SET_DAY = 'SET_DAY';
const SET_INTERVIEW = 'SET_INTERVIEW';

const reducer = (state, action) => {
  const actions = {
    SET_APPOINTMENT_DATA() {
      return {
        ...state, 
        days: action.days, 
        appointments: action.appointments, 
        interviewers: action.interviewers 
      };
    },
    SET_DAY() {
      return {...state, day:action.day};
    },
    SET_INTERVIEW() {
      return {...state, appointments: action.appointments, days: action.days};
    },
    default() {
      throw new Error(`Non-existant action type: ${action.type}`);
    }
  };
  return (actions[action.type] || actions.default)();
};

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
  return days;
};

export default function useApplicationData () {

  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({
        type: SET_APPOINTMENT_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
    })
  }, []);
  
  const _stateAfterModifyingInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return {appointment, appointments};
  };

  const setDay = (day) => dispatch({type: SET_DAY, day});

  const bookInterview = (id, interview) => {
    const {appointment, appointments} = _stateAfterModifyingInterview(id, interview);
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(()=> dispatch({
        type: SET_INTERVIEW,
        appointments,
        days: updateSpots(state, appointments)
      }));
  };
  
  const cancelInterview = (id) => {
    const {appointments} = _stateAfterModifyingInterview(id, null);

    return axios.delete(`/api/appointments/${id}`)
      .then(()=> dispatch({
        type: SET_INTERVIEW,
        appointments,
        days: updateSpots(state, appointments)
      }));
  };

  return ({state, setDay, bookInterview, cancelInterview});
}