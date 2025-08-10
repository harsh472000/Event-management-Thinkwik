import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";

import "@/styles/commonInput.css";

interface CommonInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  isPassword?: boolean;
}

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  isPassword = false,
}) => {
  const [show, setShow] = useState(false);

  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <label className="form-group">
      <span>{label}</span>
      <div className={isPassword ? "password-input-container" : ""}>
        <Field
          name={name}
          type={inputType}
          className="input"
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
      <ErrorMessage name={name} component="span" className="err" />
    </label>
  );
};

export default CommonInput;
