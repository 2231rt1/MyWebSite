import { AuthFormData } from "../model/auth.types";
import {
  loginValidationSchema,
  registrationValidationSchema,
} from "./validations";

export const getInitialValues = (isLogin: boolean, formData: AuthFormData) => {
  return isLogin
    ? { login: formData.login, password: formData.password }
    : { ...formData };
};

export const getValidationSchema = (isLogin: boolean) =>
  isLogin ? loginValidationSchema : registrationValidationSchema;
