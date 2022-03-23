export function getAppointmentsForDay(state, day) {
  const appointmentsArray = state.days.find(appointment => appointment.name === day);
  const appointments = appointmentsArray && appointmentsArray.appointments.map(id => state.appointments[id]);
  return appointments || [];
}