import { Col, FloatingLabel, Form } from "react-bootstrap";

// styles
import "../styles/CustomInput.scss";

const CustomInput = (props) => {
  const { placeholder, name, xs, md, errors, type, options, onChange, value } =
    props;
  return (
    <Col xs={xs} md={md}>
      <FloatingLabel controlId={name} label={placeholder}>
        {/* check if type === select, if so returns a select format along with options,
        otherwise it returns a text input */}
        {type === "select" ? (
          <Form.Select
            className="custom-input"
            onChange={onChange}
            name={name}
            value={value}
          >
            {options
              ? options.map((e, i) => {
                  return (
                    <option value={e} key={`${e}-${i}`}>
                      {e}
                    </option>
                  );
                })
              : null}
          </Form.Select>
        ) : (
          <Form.Control {...props} className="custom-input" />
        )}
      </FloatingLabel>
      {errors ? <div className="text-danger text-center">{errors}</div> : null}
    </Col>
  );
};

export default CustomInput;
