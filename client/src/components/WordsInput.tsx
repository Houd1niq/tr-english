import React from "react";

const WordsInput: React.FC<{
  label: string;
  placeholder?: string;
  getValue?(value: string): void;
  value?: string;
  name: string;
  onChangeExtender?: (value: string) => void;
}> = ({ label, placeholder, getValue, value, name, onChangeExtender }) => {
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
          if (onChangeExtender) onChangeExtender(event.target.value);
        }}
        value={value}
        autoComplete="off"
        className="border-b w-full sm:w-[250px] md:w-[300px] lg:w-[400px] text-main-white focus:border-main-purple bg-transparent outline-none h-8 p-2"
        name={name}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default WordsInput;
