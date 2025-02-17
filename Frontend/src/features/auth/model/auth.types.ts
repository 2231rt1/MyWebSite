export interface AuthFormData {
  login: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export interface AuthFormFieldsProps {
  isLogin: boolean;
  formData: AuthFormData;
  setFormData: React.Dispatch<React.SetStateAction<AuthFormData>>;
}
