export function getInterviewersForDay(state, day) {
  const dayState = state.days.find(appointment => appointment.name === day);
  const interviewers = dayState && dayState.appointments
    .map(id => state.appointments[id])
    .filter(({interview}) => !(!interview))
    .map(({interview}) => state.interviewers[interview.interviewer]);
  return interviewers || [];
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