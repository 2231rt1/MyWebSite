import { Link } from "@tanstack/react-router";

import "./error.module.scss";

import errorImage from "@shared/assets/images/errorImage.svg";
import { LetterGlitch } from "@shared/ui/LetterGlitch";
import { StarBorder } from "@shared/ui/StarBorder";
import { ShinyText } from "@shared/ui/ShinyText";
import { Magnet } from "@shared/ui/Magnet";

export function FallbackInternal() {
  return (
    <div role="alert" className="fallback">
      {/* Фон */}
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
        <Link to="/">
          <Magnet padding={150} disabled={false} magnetStrength={15}>
            <StarBorder className="button" color="cyan" speed="5s">
              <ShinyText text="Back to home page" disabled={false} speed={3} />
            </StarBorder>
          </Magnet>
        </Link>
      </div>
    </div>
  );
}

export const FallbackNotFound = () => <FallbackInternal />;
