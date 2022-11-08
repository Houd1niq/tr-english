import React from "react";

const FormInput: React.FC<{
  label: string;
  type: "password" | "text";
  placeholder: string;
  getValue(value: string): void;
  value: string;
}> = ({ label, type, placeholder, getValue, value }) => {
  return (
    <div className="flex py-3 items-center min-w-[290px] justify-between">
      <label htmlFor={label} className="text-main-white mr-3">
        {label}
      </label>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          getValue(event.target.value);
        }}
        value={value}
        type={type}
        placeholder={placeholder}
        className="bg-bg-input placeholder:text-xs text-main-white px-2 py-1 focus:outline-none  focus:outline-main-purple focus:outline-2 rounded-md"
        name={label}
      />
    </div>
  );
};

export default FormInput;
