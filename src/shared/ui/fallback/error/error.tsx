import { Link, useRouteError } from "react-router-dom";
import { RejectedDataType } from "@shared/types";
import errorImage from "@shared/assets/images/errorImage.svg";
import "./error.module.scss";

export const Fallback = () => {
  const error = useRouteError();
  const knownError = error as RejectedDataType;

  return (
    <div role="alert" className="fallback">
      <img src={errorImage} />
      <h1 className="fallback__title">Something went wrong</h1>
      <span className="fallback__describe">
        {knownError?.messageError} {knownError?.status}
      </span>
      <Link to="/" className="fallback__link">
        Go to home page
      </Link>
    </div>
  );
};
