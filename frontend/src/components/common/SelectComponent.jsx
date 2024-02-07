import useCustomSelect from "../../hooks/useCustomSelect";
import React, { useEffect, useRef } from "react";
const SelectComponent = ({ options, placeholder, open, customClass, onChange }) => {
  const {
    isOpen,
    selectedOption,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectOption,
  } = useCustomSelect(options, open);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Click is outside the dropdown, close the dropdown
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener when the component mounts
      document.addEventListener("click", handleClickOutside);
    }

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);


  const dropdownClassName = `nice-select ${customClass || ""} ${
    isOpen ? "open" : ""
  }`;

  return (
    <div
      className={dropdownClassName}
      tabIndex="0"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span className="current">{selectedOption || placeholder}</span>
      <ul className="list" style={{maxHeight: '300px', overflowY: 'auto'}}>
        {options.map((option, index) => (
          <li
            key={index}
            className={`option${
              selectedOption === option ? " selected focus" : ""
            }`}
            data-value={index}
            onClick={() => {
              selectOption(option);
              if (onChange) {
                onChange(option);
              }
              closeDropdown();
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default SelectComponent;


// import React from "react";

// const SelectComponent = ({ options, placeholder, value, onChange, customClass }) => {
  
//   const handleChange = (e) => {
//     const selectedValue = e.target.value;
//     if (onChange) {
//       onChange(selectedValue);
//     }
//   };

//   const selectClassName = `${customClass || ""}`;

//   return (
//     <select
//       value={value}
//       onChange={handleChange}
//       className='nice-select'
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option, index) => (
//         <option
//           key={index}
//           value={option}
//         >
//           {option}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default SelectComponent;



