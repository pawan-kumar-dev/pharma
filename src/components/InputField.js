import React from "react";
import { useField } from "formik";
const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="block text-sm">
        <span className="text-gray-700 dark:text-gray-400">{label}</span>
        <input
          className="
                    block
                    w-full
                    mt-1
                    text-sm
                    dark:border-gray-600 dark:bg-gray-700
                    focus:border-purple-400
                    focus:outline-none
                    focus:shadow-outline-purple
                    dark:text-gray-300 dark:focus:shadow-outline-gray
                    form-input
                  "
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <p style={{ fontSize: "small", color: "red" }}>{meta.error}</p>
        ) : null}
      </label>
    </>
  );
};

export default InputField;
