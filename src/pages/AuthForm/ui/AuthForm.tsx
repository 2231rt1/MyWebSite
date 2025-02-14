import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { LiquidChrome } from "@shared/ui/LiquidChrome";
import { Stepper, Step } from "@shared/ui/Stepper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.module.scss";

// Схемы валидации
const loginValidationSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const registrationValidationSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Обязательное поле"),
});

// Варианты анимации для каждого поля
const fieldVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

// Варианты анимации для контейнера формы при переключении режимов
const formContainerVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.15 },
  },
  exit: { opacity: 0, x: 20 },
};

export const AuthForm: React.FC = () => {
  // Отслеживаем текущий URL
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Режим входа определяется по URL (если содержит "signin" — вход, иначе регистрация)
  const isLogin = currentPath.toLowerCase().includes("signin");

  useEffect(() => {
    toast.info(isLogin ? "Режим входа" : "Режим регистрации");
  }, [isLogin]);

  // Переключение между режимами без перехода на другую страницу
  const toggleMode = () => {
    const newPath = isLogin ? "/SignUp" : "/SignIn";
    window.history.pushState({}, "", newPath);
    setCurrentPath(newPath);
    toast.success(
      isLogin ? "Переключено на регистрацию" : "Переключено на вход"
    );
  };

  // Создаём реф для доступа к методам Formik
  const formikRef = useRef<any>(null);

  return (
    <div className="auth-container">
      {/* Фон с LiquidChrome */}
      <div className="auth__background">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={1}
          amplitude={0.6}
          interactive={true}
        />
      </div>

      <div className="auth__content">
        <h1>{isLogin ? "Войти" : "Регистрация"}</h1>
        <Stepper
          initialStep={1}
          disableStepIndicators={true}
          onStepChange={(step) => console.log("Current step:", step)}
          onFinalStepCompleted={() => toast.success("Все шаги завершены!")}
          backButtonText="Назад"
          nextButtonText="Далее"
          className="auth-stepper"
          // Функция валидации текущего шага
          validateCurrentStep={async () => {
            if (formikRef.current) {
              const errors = await formikRef.current.validateForm();
              // Отмечаем все поля как "touched", чтобы ошибки отобразились
              const touchedFields = Object.keys(
                formikRef.current.initialValues
              ).reduce((acc, key) => ({ ...acc, [key]: true }), {});
              formikRef.current.setTouched(touchedFields);
              if (Object.keys(errors).length > 0) {
                toast.error("Пожалуйста, заполните все обязательные поля");
                return false;
              }
            }
            return true;
          }}
        >
          <Step key="step1">
            {/* Анимация переключения между режимами формы */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-form" : "registration-form"}
                variants={formContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Formik
                  innerRef={formikRef}
                  initialValues={
                    isLogin
                      ? { login: "", password: "" }
                      : {
                          login: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        }
                  }
                  validationSchema={
                    isLogin
                      ? loginValidationSchema
                      : registrationValidationSchema
                  }
                  // Отключаем валидацию на изменение и потерю фокуса
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log("Form submitted:", values);
                    // Здесь можно отправить данные на сервер (например, используя axios)
                    setSubmitting(false);
                    toast.success(
                      isLogin ? "Вход выполнен" : "Регистрация завершена"
                    );
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <motion.div variants={{ animate: {} }}>
                        {/* Поле "Логин" – всегда показываем */}
                        <motion.div
                          variants={fieldVariants}
                          className="field-container"
                        >
                          <label
                            htmlFor="login"
                            className={
                              errors.login && touched.login ? "error-text" : ""
                            }
                          >
                            Логин
                          </label>
                          <Field
                            id="login"
                            name="login"
                            type="text"
                            placeholder="Введите логин"
                            className={
                              errors.login && touched.login
                                ? "error-border"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="login"
                            component="div"
                            className="error"
                          />
                        </motion.div>

                        {/* Поле Email – показываем только в режиме регистрации */}
                        {!isLogin && (
                          <motion.div
                            variants={fieldVariants}
                            className="field-container"
                          >
                            <label
                              htmlFor="email"
                              className={
                                errors.email && touched.email
                                  ? "error-text"
                                  : ""
                              }
                            >
                              Email
                            </label>
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Введите email"
                              className={
                                errors.email && touched.email
                                  ? "error-border"
                                  : ""
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </motion.div>
                        )}

                        {/* Поле "Пароль" – всегда показываем */}
                        <motion.div
                          variants={fieldVariants}
                          className="field-container"
                        >
                          <label
                            htmlFor="password"
                            className={
                              errors.password && touched.password
                                ? "error-text"
                                : ""
                            }
                          >
                            Пароль
                          </label>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Введите пароль"
                            className={
                              errors.password && touched.password
                                ? "error-border"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="error"
                          />
                        </motion.div>

                        {/* Поле "Подтверждение пароля" – показываем только в режиме регистрации */}
                        {!isLogin && (
                          <motion.div
                            variants={fieldVariants}
                            className="field-container"
                          >
                            <label
                              htmlFor="confirmPassword"
                              className={
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "error-text"
                                  : ""
                              }
                            >
                              Подтвердите пароль
                            </label>
                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              placeholder="Подтвердите пароль"
                              className={
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "error-border"
                                  : ""
                              }
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="error"
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            </AnimatePresence>
            <button onClick={toggleMode} style={{ marginTop: "1rem" }}>
              {isLogin
                ? "Нет аккаунта? Зарегистрироваться"
                : "Уже есть аккаунт? Войти"}
            </button>
          </Step>

          <Step key="step2">
            <div>
              <h2>Дополнительная информация</h2>
              <p>Здесь можно разместить дополнительный контент.</p>
            </div>
          </Step>
        </Stepper>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
