import React, { useContext } from "react";

import { Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

const AdminFilterSettings = () => {
  const {
    setShowAllChecked,
    showAllChecked,
    showCompletedChecked,
    setShowCompletedChecked,
    showPositionsChecked,
    setShowPositionsChecked,
  } = useContext(TableDataContext);

  return (
    <Form>
      <div className="mb-3">
        <Form.Check
          inline
          label="Show All Forms"
          name="all-info"
          type={"radio"}
          id={`show-all-radio`}
          value={showCompletedChecked}
          checked={showAllChecked ? true : false}
          onChange={() => {
            if (showPositionsChecked) {
              setShowPositionsChecked(false);
            }

            if (showCompletedChecked) {
              setShowCompletedChecked(false);
            }

            setShowAllChecked(!showAllChecked);
          }}
          className="mx-5"
        />

        <Form.Check
          inline
          label="Only Show Completed Forms"
          name="completed"
          type={"radio"}
          id={`show-only-completed-radio`}
          value={showCompletedChecked}
          checked={showCompletedChecked ? true : false}
          onChange={() => {
            if (showPositionsChecked) {
              setShowPositionsChecked(false);
            }

            if (setShowAllChecked) {
              setShowAllChecked(false);
            }

            setShowCompletedChecked(!showCompletedChecked);
          }}
          className="mr-5"
        />
      </div>
    </Form>
  );
};

export default AdminFilterSettings;
