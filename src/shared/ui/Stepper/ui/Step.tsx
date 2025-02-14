import React from "react";

interface StepProps {
  children: React.ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
  return <div className="step-default">{children}</div>;
}
