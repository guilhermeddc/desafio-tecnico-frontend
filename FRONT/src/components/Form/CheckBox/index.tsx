import { useField } from "@unform/core";
import React, { useEffect, useRef, useState } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
}

export const CheckBox: React.FC<IProps> = ({ label, name, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const [isChecked, setIsChecked] = useState<boolean>(defaultValue || false);

  useEffect(() => {
    registerField({
      ref: inputRef.current,
      name: fieldName,
      getValue: () => isChecked,
      setValue: (_, value) => setIsChecked(value),
    });
  }, [fieldName, isChecked, registerField]);

  const handleChange = () => {
    setIsChecked((state) => !state);
  };

  return (
    <div className="flex items-start">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            {...props}
            type="checkbox"
            ref={inputRef}
            checked={isChecked}
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-300"
            onChange={handleChange}
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-lime-500"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
