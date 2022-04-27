const CustomTitlesForForms = ({ title, subtitle }) => {
  return (
    <div className="py-3 my-3 text-center">
      <div className="cinzel h3">{title}</div>
      {subtitle ? <div>{subtitle}</div> : null}
    </div>
  );
};

export default CustomTitlesForForms;
