import React from "react";
import { useCanvasAnimation, CanvasOptions } from "../lib/useLetterGlitch";

export interface LetterCanvasProps extends Partial<CanvasOptions> {
  glitchColors: string[];
  glitchSpeed: number;
  smooth: boolean;
}

export const LetterCanvas: React.FC<LetterCanvasProps> = ({
  glitchColors,
  glitchSpeed,
  smooth,
  charWidth = 10,
  charHeight = 20,
  fontSize = 16,
}) => {
  // Получаем callback ref из хука
  const canvasRef = useCanvasAnimation({
    glitchColors,
    glitchSpeed,
    smooth,
    charWidth,
    charHeight,
    fontSize,
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
};
