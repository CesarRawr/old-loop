const customStyles = {
  container: (provided: any, state: any) => ({
    ...provided,
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#fafafa",
    borderColor: "#dcdcdc",
    minHeight: "4.5vh",
    border: "1px solid #dcdcdc",
    borderRadius: "4px",
    boxShadow: state.isFocused ? null : null,
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    padding: "0 6px",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    height: "4.5vh",
  }),
};

export default customStyles;
