export function getInterviewersForDay(state, day) {
  const dayState = state.days.find(appointment => appointment.name === day);
  const appointments = dayState && dayState.appointments
    .map(id => state.appointments[id])
    .filter(({interview}) => !(!interview));

  const daysInterviewers = {};

  Array.isArray(appointments) && appointments.forEach(apt => {
    const {interviewer} = apt.interview;
    daysInterviewers[interviewer] = state.interviewers[interviewer];
  });

  return Object.values(daysInterviewers) || [];
}

export function getAppointmentsForDay(state, day) {
  const dayState = state.days.find(appointment => appointment.name === day);
  const appointments = dayState && dayState.appointments.map(id => state.appointments[id]);
  return appointments || [];
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];
  return {interviewer, student};
}