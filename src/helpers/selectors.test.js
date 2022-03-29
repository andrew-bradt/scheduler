import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import state from './test-data';

// getAppointmentsForDay Tests
test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

// getInterviewersForDay Tests
test.only("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test.only("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test.only("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  const [first, second, third] = getInterviewersForDay(state, "Monday");
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["2"]);
  expect(third).toEqual(state.interviewers["3"]);
});

test.only("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test.only("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

// getInterview Tests
test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["4"].interview);
  expect(result).toBeNull();
});