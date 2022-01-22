const TextInput = ({
  name,
  label,
  instructions,
  value,
  autoFocus,
  onChange,
  error,
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
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
