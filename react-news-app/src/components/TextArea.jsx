const Textarea = ({ label, name, value, onChange, rows, required }) => {
  return (
    <>
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows || 5}
        value={value}
        onChange={onChange}
        required={required}
      ></textarea>
    </>
  );
};

export default Textarea;
