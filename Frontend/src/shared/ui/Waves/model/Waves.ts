import { CSSProperties } from "react";

export interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number; // горизонтальный коэффициент скорости
  waveSpeedY?: number; // вертикальный коэффициент скорости
  waveAmpX?: number; // горизонтальная амплитуда
  waveAmpY?: number; // вертикальная амплитуда
  xGap?: number; // горизонтальный промежуток между линиями
  yGap?: number; // вертикальный промежуток между точками
  friction?: number; // коэффициент трения для эффекта курсора
  tension?: number; // натяжение для эффекта курсора
  maxCursorMove?: number; // максимальное смещение курсора
  style?: CSSProperties;
  className?: string;
}

export interface Points {
  x: number;
  y: number;
  wave: {
    x: number;
    y: number;
  };
  cursor: {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
}

export interface BoundingElement {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface MouseObject {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
}
