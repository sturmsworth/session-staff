import React from "react";

import "../styles/CustomButton.scss";

const CustomButton = ({ name, handleClick, buttonType, ...otherProps }) => {
  return buttonType === "custom-google-btn" ? (
    <button
      className={`${buttonType} btn btn-danger`}
      onClick={handleClick}
      {...otherProps}
    >
      <i className="fab fa-google" />
      <span>{` ${name}`}</span>
    </button>
  ) : (
    <button
      className={`${buttonType} btn custom-button`}
      onClick={handleClick}
      {...otherProps}
    >
      {name}
    </button>
  );
};

export default CustomButton;
