const TextArea = ({
  name,
  label,
  instructions,
  autoFocus,
  value,
  defaultValue,
  onChange,
  cols,
  rows,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={"name"}>{label}</label>
      <br />
      <span className="__instructions">{instructions}</span>
      <textarea
        className={error ? "--error" : ""}
        id={name}
        name={name}
        cols={cols}
        rows={rows}
        autoFocus={autoFocus}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {error && <span className="--error-message">{error}</span>}
    </div>
  );
};

export default TextArea;
