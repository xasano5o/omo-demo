import React from "react";

export default function InputField({
  label,
  id,
  name,
  type,
  value,
  autoComplete,
  handleChange,
  icon,
  placeholder,
  onChange,

}) {
  return (
    <div className="col-span-1 row-span-1 relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 w-72"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e)}
          className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 
          border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        />
        {icon}
      </div>
    </div>
  );
}
