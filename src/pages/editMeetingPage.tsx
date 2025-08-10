import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import EditMeetingForm from "@/widgets/meeting/editMeetingForm";

const EditMeetingPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/Plaza/step1_6");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <StepFormLayout
      title="정보 수정하기"
      subtitle="모임 정보를 수정할 수 있어요"
      onNext={handleSave}
      onPrev={handleCancel}
      nextButtonText="저장"
      prevButtonText="취소"
      isScrollable={true}
      contentAlignment="start"
    >
      <EditMeetingForm />
    </StepFormLayout>
  );
};

export default EditMeetingPage;
