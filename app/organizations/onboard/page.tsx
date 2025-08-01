"use client";
import ManagerForm from "@/components/form/ManagerForm";
import OwnerForm from "@/components/form/OwnerForm";
import React, { useEffect, useState } from "react";

const OnBoardPage = () => {
  const [step, setStep] = useState(1);
  const [selectedOrg, setSelectedOrg] = useState<string>(""); // "" = non
  const [formShow, setFormShow] = useState(false);
  const handleSelect = (v: string) => {
    if (v === "owner") {
      setSelectedOrg("owner");
      setFormShow(true);
    } else {
      setSelectedOrg(v);
      setStep(1);
    }
  };

  useEffect(() => {
    if (!selectedOrg) setStep(1);
  }, [selectedOrg]);

  const progress = step === 1 ? 1 : 2;
  const progressPercent = Math.min(100, (progress / 6) * 100);

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="font-semibold text-slate-900 mb-1 text-base">
        Onboarding
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
        <div className="text-xs mt-1">Step {progress} of 6</div>
      </div>

      {/* Owner form with select inside */}

      {step === 1 && (
        <OwnerForm
          selectedOrg={selectedOrg}
          setStep={setStep}
          handleSelect={handleSelect}
        />
      )}
      {step === 2 && (
        <ManagerForm selectedOrg={selectedOrg} handleSelect={handleSelect} />
      )}
    </div>
  );
};

export default OnBoardPage;
