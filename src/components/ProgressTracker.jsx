import React, { useContext } from "react";

// context
import { MetaDataContext } from "../context/MetaDataContext";

// styles
import "../styles/ProgressTracker.scss";

// bootstrap
import ProgressBar from "react-bootstrap/ProgressBar";

const ProgressTracker = () => {
  const { percentage } = useContext(MetaDataContext);

  return (
    <div className="mt-5 py-5 progress-tracker text-center">
      <div className="h3">Your Progress Snapshot:</div>
      <div className="text-center px-5 pt-3">
        <h5 className="cinzel">Percentage Complete: </h5>
        <ProgressBar
          min={0}
          max={100}
          now={percentage}
          label={`${percentage}%`}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
