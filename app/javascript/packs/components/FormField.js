import React from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";

const FormControl = ({ controlId, controlLabel, children }) => (
  <FormGroup controlId={controlId}>
    <ControlLabel>{controlLabel}</ControlLabel>
    {children}
  </FormGroup>
);

export default FormControl;
