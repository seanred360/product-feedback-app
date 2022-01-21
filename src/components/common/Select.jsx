const Select = ({ name, label, instructions, onChange, items, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <span className="__instructions">{instructions}</span>
      <select
        name={name}
        id={name}
        className={error ? "--error" : ""}
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
