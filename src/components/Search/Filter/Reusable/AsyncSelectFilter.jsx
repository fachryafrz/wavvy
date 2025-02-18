import AsyncSelect from "react-select/async";

export default function AsyncSelectFilter({ title, isRequired, ...props }) {
  return (
    <div className={`space-y-2 pb-2`}>
      <div className={`flex items-center gap-2`}>
        <h3 className={`font-medium`}>{title}</h3>

        {isRequired && (
          <span className={`badge badge-primary badge-sm`}>Required</span>
        )}
      </div>

      <div className={`-mx-1`}>
        <AsyncSelect
          {...props}
          styles={{
            placeholder: (styles) => ({
              ...styles,
              fontSize: "14px",
              whiteSpace: "nowrap",
            }),
            control: (styles, state) => ({
              ...styles,
              color: "#fff",
              backgroundColor: "#0a0a0a",
              borderWidth: "1px",
              borderColor: "transparent",
              borderRadius: "1.5rem",
              cursor: "text",
              boxShadow: state.isFocused
                ? "0 0 0 2px #ff6337 !important"
                : "none",
              "&:hover": {
                boxShadow: "0 0 0 1px #ff6337",
              },
            }),
            input: (styles, { isDisabled }) => ({
              ...styles,
              color: "#fff",
            }),
            dropdownIndicator: (styles) => ({
              ...styles,
              display: "none",
            }),
            indicatorSeparator: (styles) => ({
              ...styles,
              display: "none",
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: "#0a0a0a",
            }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                color: "#fff",
                backgroundColor: isSelected
                  ? "rgba(255,255,255,0.1)"
                  : "#0a0a0a",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              };
            },
            multiValue: (styles) => ({
              ...styles,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "9999px",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              color: "#fff",
            }),
            multiValueRemove: (styles) => ({
              ...styles,
              color: "#fff",
              borderRadius: "9999px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }),
            clearIndicator: (styles) => ({
              ...styles,
              display: "block",
              "&:hover": {
                color: "#fff",
              },
              cursor: "pointer",
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "#fff",
            }),
            dropdownIndicator: (styles) => ({
              ...styles,
              display: "block",
              "&:hover": {
                color: "#fff",
              },
              cursor: "pointer",
            }),
          }}
        />
      </div>
    </div>
  );
}
