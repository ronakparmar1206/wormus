"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { NoonReportFormData } from "./noonReportSchema";

const OnBoardPage = () => {
  const [step, setStep] = useState(1);

  const progress = step;
  const progressPercent = Math.min(100, (progress / 6) * 100);

  // Form handle
  const [formData, setFormData] = useState<Partial<NoonReportFormData>>({});

  const updateFormData = (newValues: Partial<NoonReportFormData>) => {
    setFormData((prev) => ({ ...prev, ...newValues }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 justify-between">
        <div className="font-semibold text-slate-900 mb-1 text-base">
          Noon Reporting : Watch Details
        </div>
        <div className="text-xs mt-1">Step {progress} of 7</div>
      </div>

      {/* Progress */}
      <div className="relative w-full mb-4">
        <div className="h-1.5 bg-[#E2E6F9] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            style={{
              width: `${progressPercent}%`,
              background: "var(--primary-100)",
            }}
          />
        </div>
      </div>

      {/* Owner form with select inside */}
      {step === 1 && (
        <Step1
          defaultValues={formData}
          onNext={(data) => {
            updateFormData(data);
            nextStep();
          }}
        />
      )}

      {step === 2 && (
        <Step2
          defaultValues={formData}
          onNext={(data) => {
            updateFormData(data);
            nextStep();
          }}
          onBack={prevStep}
        />
      )}

      {step === 3 && (
        <Step3
          defaultValues={formData}
          onNext={(data) => {
            updateFormData(data);
            nextStep();
          }}
          onBack={prevStep}
        />
      )}

      {step === 4 && (
        <Step4
          defaultValues={formData}
          onNext={(data) => {
            updateFormData(data);
            nextStep();
          }}
          onBack={prevStep}
        />
      )}

      {step === 5 && (
        <Step5
          defaultValues={formData}
          onNext={(data) => {
            updateFormData(data);
            nextStep();
          }}
          onBack={prevStep}
        />
      )}

      {step === 6 && (
        <Step6
          defaultValues={formData}
          onNext={(data) => {
            updateFormData(data);
            console.log("Final form data:", {
              ...formData,
              ...data,
            });
            // submit
          }}
          onBack={prevStep}
        />
      )}
    </div>
  );
};

export default OnBoardPage;
