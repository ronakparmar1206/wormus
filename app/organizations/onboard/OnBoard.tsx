"use client";
import ManagerForm from "@/components/form/ManagerForm";
import NameForm from "@/components/form/NameForm";
import OwnerForm from "@/components/form/OwnerForm";
import VesselFormOne from "@/components/form/VesselFormOne";
import VesselFormThree from "@/components/form/VesselFormThree";
import VesselFormTwo from "@/components/form/VesselFormTwo";
import VesselFormFour from "@/components/form/VesselFour";
import React, { useEffect, useState } from "react";

const OnBoardPage = ({ vessel }: any) => {
  const [step, setStep] = useState(1);
  const [selectedOrg, setSelectedOrg] = useState<string>(""); // "" = non
  const [formShow, setFormShow] = useState(false);
  const [selectManager, setSelectedManager] = useState<string>("");
  const handleSelect = (v: string) => {
    console.log(v);
    if (v === "owner") {
      setSelectedOrg("owner");
      setFormShow(true);
    } else {
      setSelectedOrg(v);
      setStep(2);
    }
  };
  const handleManagerSelect = (v: string) => {
    if (v === "manager") {
      setSelectedManager("manager");
    } else {
      setSelectedManager(v);
      setStep(3);
    }
    setSelectedManager(v);
  };
  const handleName = () => {
    setStep(4);
  };
  const formOne = () => {
    setStep(5);
  };
  const formTwo = () => {
    setStep(6);
  };
  useEffect(() => {
    if (vessel) setStep(4);
  }, [vessel]);
  const formThree = () => {
    setStep(7);
  };
  const formFour = () => {
    setStep(8);
  };
  const progress = step;
  const progressPercent = Math.min(100, (progress / 6) * 100);
  const storedManagerId =
    typeof window !== "undefined" ? localStorage.getItem("managerId") : null;
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
        <div className="text-xs mt-1">Step {progress} of 7</div>
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
        <ManagerForm
          selectedOrg={selectManager}
          handleSelect={handleManagerSelect}
        />
      )}

      {step === 3 && (
        <NameForm
          handleSelect={handleName}
          managerId={selectManager}
          ownerId={selectedOrg}
        />
      )}

      {step === 4 && <VesselFormOne handleSelect={formOne} vessel={vessel} />}
      {step === 5 && <VesselFormTwo handleSelect={formTwo} />}
      {step === 6 && <VesselFormThree handleSelect={formThree} />}
      {step === 7 && (
        <VesselFormFour
          handleSelect={formFour}
          managerId={selectManager || storedManagerId}
        />
      )}
    </div>
  );
};

export default OnBoardPage;
