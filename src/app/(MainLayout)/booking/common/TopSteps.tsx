import { BOOKINGSTEPS } from "@/constants/data";
import React, { Dispatch, SetStateAction } from "react";

function TopSteps({
  currentStep,
  maxStepReached,
  setCurrentStep,
}: {
  currentStep: number;
  maxStepReached: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="step-stepContainer">
      {BOOKINGSTEPS.map((label: string, index: number) => (
        <div className="step-stepItem" key={index}>
          {index !== 0 && (
            <div
              className={`step-line ${
                index <= currentStep ? "step-activeLine" : ""
              }`}
            />
          )}
          <div
            className={`step-circle ${
              index < currentStep
                ? "step-completed"
                : index === currentStep
                ? "step-active"
                : ""
            }`}
            onClick={() => {
              if (index < maxStepReached + 1) {
                setCurrentStep(index);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {index === currentStep ? (
              <span>&#8658;</span>
            ) : (
              index < currentStep && <span>&#10003;</span>
            )}
          </div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default TopSteps;
