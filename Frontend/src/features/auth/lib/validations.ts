import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

export const registrationValidationSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  email: Yup.string()
    .email("Неверный email")
    .matches(/@.*\./, "Email должен содержать точку после @")
    .required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Обязательное поле"),
});
