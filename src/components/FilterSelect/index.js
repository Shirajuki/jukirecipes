import React from 'react';
import Filter from '../Filter';
import styles from './FilterSelect.module.scss';
const FilterSelect = ({
  selected,
  setSelected,
  values,
  readOnly = false,
  rounded = false,
}) => {
  const selectHandler = (value) => {
    const nselected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(nselected);
  };
  return (
    <div className={`${styles.filterWrapper} ${readOnly ? styles.readOnly : ''}`}>
      {values.map((value, index) => (
        <Filter
          key={value + index}
          selected={selected.includes(value)}
          onClick={() => selectHandler(value)}
          readOnly={readOnly}
          rounded={rounded}
        >
          {value}
        </Filter>
      ))}
    </div>
  );
};
export default FilterSelect;
