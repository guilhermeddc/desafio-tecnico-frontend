import { useField } from "@unform/core";
import React, { useEffect, useState } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  error?: string;
  name: string;
}

export const Textarea: React.FC<IProps> = ({ label, name, ...props }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, value) => setValue(value),
    });
  }, [fieldName, value, registerField]);

  const handleChange = (
    _: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    value: string
  ) => {
    setValue(value);
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-white">
          {label}
        </label>
      )}

      <textarea
        {...props}
        value={value || ""}
        rows={5}
        onChange={(e) => handleChange(e, e.target.value)}
        className="bg-ada text-white text-sm rounded-md block w-full p-4"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  );
};
