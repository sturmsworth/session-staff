import { useContext } from "react";

// constants
import { formURLs } from "../utils/constants";

// styles
import "../styles/FormDownloads.scss";

// context
import { MetaDataContext } from "../context/MetaDataContext";

const FormDownloads = () => {
  const { metaData } = useContext(MetaDataContext);
  const { position, transportation, personalInfoCompleted } = metaData;

  const filterForms = (transportation, array) => {
    if (transportation !== "Car") {
      const filteredArray = array.filter((item) => {
        return item.name !== "pf";
      });

      return filteredArray;
    } else {
      return array;
    }
  };

  return (
    <div className="form-downloads py-5 mt-3">
      <div className="h3 text-center">Form Downloads</div>
      <div className="">
        <div className="px-5 text-center">
          {position === "Legislative Assistant" ||
          position === "Intern" ||
          position === "Senator Staff" ? (
            <p>There are no required forms for your position.</p>
          ) : (
            <div>
              {!personalInfoCompleted ? (
                <div className="form-downloads-warning">
                  <p>
                    Before you begin your form downloads please complete Step 1:
                    Personal Information. Your answers may change your list of
                    required forms.
                  </p>
                </div>
              ) : null}

              <p>
                Please click on each link to open them in a new screen. Each
                form must be downloaded, completed, scanned, and submitted in a
                PDF format with a size no larger than 10MB before being uploaded
                as part of Step 3.
              </p>

              <p>
                Read the requirements for each for carefully, as they may
                require additional documentation. In these cases please include
                any additional materials in the same scanned document.
              </p>
              <p>* indicates that additional documentation is needed</p>
            </div>
          )}
        </div>
        {position === "Legislative Assistant" ||
        position === "Intern" ||
        position === "Senator Staff" ? null : (
          <ul className="px-5 pt-3 text-center">
            {filterForms(transportation, formURLs).map((form, i) => (
              <li
                className="px-3"
                key={`${form.name}-${i}`}
                style={{ listStyleType: "none", margin: "0 auto" }}
              >
                <a href={form.href} target="_blank" rel="noopener noreferrer">
                  {form.printedName}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormDownloads;
