// components
import SmolLoading from "./SmolLoading";

// styles
import "../styles/CustomButton.scss";

const CustomButton = ({
  name,
  handleClick,
  buttonType,
  loading,
  ...otherProps
}) => {
  return buttonType === "custom-google-btn" ? (
    <button
      className={`${buttonType} btn btn-danger`}
      onClick={handleClick}
      {...otherProps}
    >
      {loading ? (
        <SmolLoading />
      ) : (
        <div>
          <i className="fab fa-google" />
          <span>{` ${name}`}</span>
        </div>
      )}
    </button>
  ) : (
    <button
      className={`${buttonType} btn custom-button`}
      onClick={handleClick}
      {...otherProps}
    >
      {loading ? (
        <SmolLoading />
      ) : (
        <div>
          <span>{`${name}`}</span>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
