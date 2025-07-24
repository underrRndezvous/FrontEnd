import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupNameForm from "@/widgets/meeting/groupNameForm";
import StepFormLayout from "@/shared/ui/StepFormLayout";

const Step1_1Page = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");

  const handleNext = () => {
    console.log("입력된 모임 이름:", groupName);
    navigate("/Plaza/step1_2");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const isNextDisabled = groupName.trim() === "";

  return (
    <StepFormLayout
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      <GroupNameForm groupName={groupName} onGroupNameChange={setGroupName} />
    </StepFormLayout>
  );
};

export default Step1_1Page;
