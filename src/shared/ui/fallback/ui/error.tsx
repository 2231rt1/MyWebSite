import { Link } from "@tanstack/react-router";
import { RejectedDataType } from "@shared/types";
import errorImage from "@shared/assets/images/errorImage.svg";
import { LetterGlitch } from "@shared/ui/LetterGlitch";
import "./error.module.scss";

export function FallbackInternal({
  error,
  reset,
}: { error?: unknown; reset?: () => void } = {}): JSX.Element {
  const knownError = error as RejectedDataType | undefined;

  return (
    <div role="alert" className="fallback">
      {/* Фон с LetterGlitch */}
      <div className="fallback__background">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={false}
        />
      </div>
      {/* Контент */}
      <div className="fallback__content">
        <img src={errorImage} alt="Error" className="fallback__error-image" />
        <h1 className="fallback__title">Что-то пошло не так</h1>
        {knownError && (
          <>
            <p className="fallback__message">
              {knownError.messageError || "Не удалось загрузить данные."}
            </p>
            {knownError.status && (
              <p className="fallback__status">
                Код ошибки: {knownError.status}
              </p>
            )}
          </>
        )}
        {reset && <button onClick={reset}>Повторить попытку</button>}
        <Link to="/" className="fallback__link">
          На главную страницу
        </Link>
      </div>
    </div>
  );
}

export const FallbackNotFound = () => <FallbackInternal />;
