import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepContentWrapperProps } from "../model/stepper.types";
import { SlideTransition } from "./SlideTransition";

export function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setParentHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();

    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [children]);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(height) => setParentHeight(height)} // Добавьте это свойство
          >
            {/* Оборачиваем контент в контейнер, который остаётся в потоке */}
            <div ref={contentRef}>{children}</div>
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
