import React from "react";

const WordsInput: React.FC<{
  label: string;
  placeholder?: string;
  getValue?(value: string): void;
  value?: string;
  name: string;
}> = ({ label, placeholder, getValue, value, name }) => {
  return (
    <div className="relative h-14">
      <label
        className="text-main-white text-xs absolute top-9 left-1"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (getValue) getValue(event.target.value);
        }}
        value={value}
        autoComplete="off"
        className="border-b text-main-white focus:border-main-purple bg-transparent outline-none w-[500px] h-8 p-2"
        name={name}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default WordsInput;
