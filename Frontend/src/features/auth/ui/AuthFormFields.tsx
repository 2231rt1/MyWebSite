import React from "react";
import { motion } from "framer-motion";
import AuthInputField from "./AuthInputField";

import { AuthFormData, AuthFormFieldsProps } from "../model/auth.types";

const fieldVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  isLogin,
  formData,
  setFormData,
}) => {
  return (
    <>
      <AuthInputField
        name="login"
        type="text"
        label="Логин"
        placeholder="Введите логин"
        formData={formData}
        setFormData={setFormData}
        variants={fieldVariants}
      />
      {!isLogin && (
        <AuthInputField
          name="email"
          type="email"
          label="Email"
          placeholder="Введите email"
          formData={formData}
          setFormData={setFormData}
          variants={fieldVariants}
        />
      )}
      <AuthInputField
        name="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        formData={formData}
        setFormData={setFormData}
        variants={fieldVariants}
      />
      {!isLogin && (
        <AuthInputField
          name="confirmPassword"
          type="password"
          label="Подтвердите пароль"
          placeholder="Подтвердите пароль"
          formData={formData}
          setFormData={setFormData}
          variants={fieldVariants}
        />
      )}
    </>
  );
};

export default AuthFormFields;
