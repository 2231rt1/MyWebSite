import { motion, Variants } from "framer-motion";
import { StepConnectorProps } from "../model/stepper.types";

export function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "rgba(0, 0, 0, 0)" },
    complete: { width: "100%", backgroundColor: "#00d8ff" },
  };

  return (
    <div className="step-connector">
      <motion.div
        className="step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
