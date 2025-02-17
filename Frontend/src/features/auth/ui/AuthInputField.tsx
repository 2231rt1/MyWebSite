import React from "react";
import { Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";

interface AuthInputFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  variants: Record<string, any>;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  name,
  type,
  label,
  placeholder,
  formData,
  setFormData,
  variants,
}) => {
  return (
    <motion.div variants={variants} className="field-container">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field }: any) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e);
              setFormData((prev: any) => ({ ...prev, [name]: e.target.value }));
            }}
          />
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </motion.div>
  );
};

export default AuthInputField;
