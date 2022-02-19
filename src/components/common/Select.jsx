const Select = ({
  name,
  label,
  instructions,
  onChange,
  items,
  value,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <br />
      <span className="__instructions">{instructions}</span>
      <select
        name={name}
        id={name}
        className={error ? "--error" : ""}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <option
            className="__dropdown-item"
            key={item + " option"}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
