import { Form, Text, TextArea, Radio, RadioGroup, Select, Checkbox } from 'react-form';
import React from 'react';
const statusOptions = [
  {
    label: 'Single',
    value: 'single',
  },
  {
    label: 'In a Relationship',
    value: 'relationship',
  },
  {
    label: "It's Complicated",
    value: 'complicated',
  },
]
export default () => (
  <Form >
    {formApi => (
      <form onSubmit={formApi.submitForm} id="form2">
        <label htmlFor="firstName">First name</label>
        <Text field="firstName" id="firstName" />
        <label htmlFor="lastName">Last name</label>
        <Text field="lastName" id="lastName" />
        <RadioGroup field="gender">
          <label htmlFor="male" className="mr-2">Male</label>
          <Radio value="male" id="male" className="mr-3 d-inline-block" />
          <label htmlFor="female" className="mr-2">Female</label>
          <Radio value="female" id="female" className="d-inline-block" />
        </RadioGroup>
        <label htmlFor="bio">Bio</label>
        <TextArea field="bio" id="bio" />
        <label htmlFor="authorize" className="mr-2">Authorize</label>
        <Checkbox field="authorize" id="authorize" className="d-inline-block" />
        <label htmlFor="status" className="d-block">Relationship status</label>
        <Select field="status" id="status" options={statusOptions} className="mb-4" />
        <button type="submit" className="mb-4 btn btn-primary">
          Submit
        </button>
      </form>
    )}
  </Form>
)