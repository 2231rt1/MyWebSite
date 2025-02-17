import React from "react";

export interface LiquidChromeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Base color as an RGB array. Default is [0.1, 0.1, 0.1].
   */
  baseColor?: [number, number, number];
  /**
   * Animation speed multiplier. Default is 1.0.
   */
  speed?: number;
  /**
   * Amplitude of the distortion. Default is 0.6.
   */
  amplitude?: number;
  /**
   * Frequency modifier for the x distortion. Default is 2.5.
   */
  frequencyX?: number;
  /**
   * Frequency modifier for the y distortion. Default is 1.5.
   */
  frequencyY?: number;
  /**
   * Enable mouse/touch interaction. Default is true.
   */
  interactive?: boolean;
}
