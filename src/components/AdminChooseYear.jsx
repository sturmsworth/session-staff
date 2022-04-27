import React, { useContext } from "react";

import { TableDataContext } from "../context/TableDataContext";

import { Row, Col } from "react-bootstrap";

import "../styles/AdminChooseYear.scss";

const AdminChooseYear = () => {
  const { yearData, setYear } = useContext(TableDataContext);
  return (
    <Row>
      {yearData.map((e, i) => {
        return (
          <Col key={i}>
            <span className="custom-link" onClick={() => setYear(e)}>
              {e}
            </span>
          </Col>
        );
      })}
    </Row>
  );
};

export default AdminChooseYear;
