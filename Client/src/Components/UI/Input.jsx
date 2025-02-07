import PropTypes from "prop-types";

const TextInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <>
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
   
    </>
  );
};
TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    numberofbutton: PropTypes.number,
  buttontext: PropTypes.string
};

export default TextInput;
