import React from "react";
import { LetterCanvas } from "./LetterCanvas";

export interface LetterGlitchProps {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
}

export const LetterGlitch: React.FC<LetterGlitchProps> = ({
  glitchColors,
  glitchSpeed,
  centerVignette,
  outerVignette,
  smooth,
}) => {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000000",
    overflow: "hidden",
  };

  const vignetteOuterStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
  };

  const vignetteCenterStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
  };

  return (
    <div style={containerStyle}>
      <LetterCanvas
        glitchColors={glitchColors}
        glitchSpeed={glitchSpeed}
        smooth={smooth}
      />
      {outerVignette && <div style={vignetteOuterStyle} />}
      {centerVignette && <div style={vignetteCenterStyle} />}
    </div>
  );
};
