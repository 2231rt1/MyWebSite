import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";
import { useRouter, Router, RouterState } from "@tanstack/react-router";
import { LiquidChrome } from "@shared/ui/LiquidChrome";
import { Stepper, Step } from "@shared/ui/Stepper";
import { getInitialValues, getValidationSchema } from "../lib/formikConfig";
import { AuthFormData } from "../model/auth.types";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.module.scss";

interface Cache {
  data?: any;
}

const LazyAuthFormFields = React.lazy(() => import("./AuthFormFields"));

const initialFormData: AuthFormData = {
  login: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const formContainerVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.15 },
  },
  exit: { opacity: 0, x: 20 },
};

const cache: Cache = {};
const getData = async () => {
  if (cache.data) return cache.data;
  const data = await fetch("/api/data");
  cache.data = data;
  return data;
};

export const AuthForm = () => {
  const router = useRouter<Router<any, any, any, any, any, any>>();
  const routerState = router.state as RouterState;
  const [isLogin, setIsLogin] = useState(false);
  const [enableLiveValidation, setEnableLiveValidation] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>(initialFormData);
  const formikRef = useRef<any>(null);

  useEffect(() => {
    const currentPath = routerState.location.pathname.toLowerCase();
    setIsLogin(currentPath.includes("signin"));
    getData();
  }, [routerState.location.pathname]);

  const toggleMode = useCallback(() => {
    const newPath = isLogin ? "/SignUp" : "/SignIn";
    setIsLogin(!isLogin);
    router.navigate({ to: newPath });
    setEnableLiveValidation(false);
  }, [isLogin, router, setIsLogin, setEnableLiveValidation]);

  const initialValues = getInitialValues(isLogin, formData);
  const validationSchema = getValidationSchema(isLogin);

  const background = useMemo(() => {
    return (
      <div className="auth__background">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={1}
          amplitude={0.6}
          interactive={true}
        />
      </div>
    );
  }, []);

  return (
    <div className="auth__container">
      {background}
      <div className="auth__content">
        <Stepper
          initialStep={1}
          disableStepIndicators={true}
          onFinalStepCompleted={() =>
            toast.success("Все шаги завершены!", {
              className: "toast-success-custom",
            })
          }
          backButtonText="Назад"
          nextButtonText="Далее"
          className="auth__stepper"
          validateCurrentStep={async () => {
            if (formikRef.current) {
              const errors = await formikRef.current.validateForm();
              const touchedFields = Object.keys(
                formikRef.current.initialValues
              ).reduce((acc, key) => ({ ...acc, [key]: true }), {});
              formikRef.current.setTouched(touchedFields);
              if (Object.keys(errors).length > 0) {
                setEnableLiveValidation(true);
                return false;
              }
            }
            return true;
          }}
        >
          <Step key="step1">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-form" : "registration-form"}
                variants={formContainerVariants}
                initial={false}
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Formik
                  innerRef={formikRef}
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  validateOnBlur={enableLiveValidation}
                  validateOnChange={enableLiveValidation}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log("Form submitted:", values);
                    setSubmitting(false);
                    toast.success(
                      isLogin ? "Вход выполнен" : "Регистрация завершена",
                      {
                        className: "toast-success-custom",
                      }
                    );
                  }}
                >
                  {() => (
                    <Form>
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <LazyAuthFormFields
                          isLogin={isLogin}
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </React.Suspense>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            </AnimatePresence>
            <button
              className="toggle-button"
              type="button"
              onClick={toggleMode}
            >
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
        toastClassName="custom-toast"
      />
    </div>
  );
};
