import React from "react";

import { useAsyncDebounce } from "react-table";

import { FormControl, InputGroup } from "react-bootstrap";

const AdminTableSearch = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup>
      <InputGroup.Text id="admin-table-search">Search</InputGroup.Text>
      <FormControl
        aria-label="Search"
        aria-describedby="admin-table-search"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </InputGroup>
  );
};

export default AdminTableSearch;
