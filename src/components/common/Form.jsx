import * as React from "react";
import {
  FormWithConstraints,
  FieldFeedbacks,
  FieldFeedback,
} from "react-form-with-constraints";

class Form extends React.Component {
  handleChange = (e) => {
    this.form.validateFields(e.target);
  };

  contactSubmit = (e) => {
    e.preventDefault();

    this.form.validateFields();

    if (!this.form.isValid()) {
      console.log("form is invalid: do not submit");
    } else {
      console.log("form is valid: submit");
    }
  };

  render() {
    return (
      <FormWithConstraints
        ref={(form) => (this.form = form)}
        onSubmit={this.contactSubmit}
        noValidate
      >
        <input
          type="text"
          name="text"
          size="30"
          placeholder=""
          required
          onChange={this.handleChange}
          className="form-control"
        />
        <FieldFeedbacks for="text">
          <FieldFeedback when="valueMissing" warning>
            Can't be empty
          </FieldFeedback>
        </FieldFeedbacks>
      </FormWithConstraints>
    );
  }
}

export default Form;
