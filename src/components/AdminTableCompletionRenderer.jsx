import React, { useContext } from "react";

import { Button, OverlayTrigger, Popover, Row, Col } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

const AdminTableCompletionRenderer = ({ row }) => {
  const { setCurrentEmail } = useContext(TableDataContext);
  return (
    <div {...row.getToggleRowExpandedProps()}>
      <div
        onClick={() => {
          setCurrentEmail(row.original.email);
        }}
      >
        <span
          className={
            row.original.personalInfo === "completed" &&
            row.original.emergencyContactInfo === "completed" &&
            row.original.attachments === "completed"
              ? "text-success"
              : "text-danger"
          }
        >
          {`${
            row.original.personalInfo === "completed" &&
            row.original.emergencyContactInfo === "completed" &&
            row.original.attachments === "completed"
              ? "Complete"
              : "Incomplete"
          }`}
          {/* Overlay Trigger and everything inside it controls the tooltip layout */}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 0 }}
            overlay={
              <Popover id="applicant-status-quick-look">
                <Popover.Header>Quick View</Popover.Header>
                <Popover.Body>
                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Personal Info:</b>
                      </div>
                      <div>
                        {row.original.personalInfo
                          ? row.original.personalInfo
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Emergency Info:</b>
                      </div>
                      <div>
                        {row.original.emergencyContactInfo
                          ? row.original.emergencyContactInfo
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Attachments:</b>
                      </div>
                      <div>
                        {row.original.attachments
                          ? row.original.attachments
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>
                </Popover.Body>
              </Popover>
            }
          >
            <Button size="sm" className="custom-link mx-3">
              More{" "}
              <i
                className={
                  row.isExpanded ? "fas fa-caret-down" : "fas fa-caret-right"
                }
              />
            </Button>
          </OverlayTrigger>
        </span>
      </div>
    </div>
  );
};

export default AdminTableCompletionRenderer;
