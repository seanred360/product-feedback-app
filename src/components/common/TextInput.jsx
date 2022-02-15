const TextInput = ({
  name,
  label,
  type,
  instructions,
  defaultValue,
  value,
  required,
  placeholder,
  autoFocus,
  onChange,
  error,
  message,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={"name"}>{label}</label>
      <br />
      <span className="__instructions">{instructions}</span>
      <input
        className={error ? "--error" : ""}
        id={name}
        name={name}
        type={type ? type : "text"}
        defaultValue={defaultValue}
        value={value}
        required={required}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={onChange}
      />
      {error && <span className="--error-message">{error}</span>}
      {message && <span className="--message">{message}</span>}
    </div>
  );
};

export default TextInput;
