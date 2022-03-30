import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers = {interviewers}/>);
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', ()=>{
    const {getByTestId} = render(<Form interviewers = {interviewers} student='Lydia Miller-Jones'/>);
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('can successfully save after trying to submit an empty student name', ()=>{
    const onSave = jest.fn();
    const {getByPlaceholderText, getByText, queryByText} = render(<Form interviewers = {interviewers} onSave = {onSave}/>);
    
    const input = getByPlaceholderText('Enter Student Name');
    const saveButton = getByText('Save');
    const errorMsg = /student name cannot be blank/i;
    
    // Click on Save Button without a student name
    fireEvent.click(saveButton);
    expect(onSave).not.toHaveBeenCalled();
    expect(getByText(errorMsg)).toBeInTheDocument();
    
    // Then enter a student name and save
    const student = 'Lydia Miller-Jones';
    fireEvent.change(input, {target : { value : student}});
    fireEvent.click(saveButton);
    
    expect(queryByText(errorMsg)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(student, null);
  });

  it('submits the name entered by the user', ()=>{
    const onSave = jest.fn();

    const {getByText, getByPlaceholderText} = render(<Form interviewers = {interviewers} onSave = {onSave}/>);
    
    const input = getByPlaceholderText('Enter Student Name');

    fireEvent.change(input, { target : { value : 'Lydia Miller-Jones'}});
    fireEvent.click(getByText('Save'));

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue('');
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
