import { Link } from "@tanstack/react-router";

import "./error.module.scss";

import errorImage from "@shared/assets/images/errorImage.svg";
import { Waves } from "@shared/ui/Waves";
import { StarBorder } from "@shared/ui/StarBorder";
import { ShinyText } from "@shared/ui/ShinyText";
import { Magnet } from "@shared/ui/Magnet";

export function FallbackInternal() {
  return (
    <div role="alert" className="fallback">
      {/* Фон */}
      <div className="fallback__background">
        <Waves
          lineColor="rgba(57, 0, 153)"
          backgroundColor="rgba(0, 0, 0, 0.2)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
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
