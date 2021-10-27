import { Col, FloatingLabel, Form } from "react-bootstrap";

// styles
import "../styles/CustomInput.scss";

const CustomInput = (props) => {
  const { placeholder, name, xs, md, errors } = props;
  return (
    <Col xs={xs} md={md}>
      <FloatingLabel controlId={name} label={placeholder}>
        <Form.Control {...props} className="custom-input" />
      </FloatingLabel>
      {errors ? <div className="text-danger text-center">{errors}</div> : null}
    </Col>
  );
};

export default CustomInput;
