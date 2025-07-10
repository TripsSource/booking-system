import { BOOKINGSTEPS } from "@/constants/data";
import React, { Dispatch, SetStateAction } from "react";

function TopSteps({
  step,
  setStep,
}: {
  step: { current: number; max: number };
  setStep: Dispatch<SetStateAction<{ current: number; max: number }>>;
}) {
  return (
    <div className="step-stepContainer">
      {BOOKINGSTEPS.map((label: string, index: number) => (
        <div className="step-stepItem" key={index}>
          {index !== 0 && (
            <div
              className={`step-line ${
                index <= step.current ? "step-activeLine" : ""
              }`}
            />
          )}
          <div
            className={`step-circle ${
              index < step.current
                ? "step-completed"
                : index === step.current
                ? "step-active"
                : ""
            }`}
            onClick={() => {
              if (index < step.max + 1) {
                setStep((pre) => ({ ...pre, current: index }));
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {index === step.current ? (
              <span>&#8658;</span>
            ) : (
              index < step.current && <span>&#10003;</span>
            )}
          </div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default TopSteps;
