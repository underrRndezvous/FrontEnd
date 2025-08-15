import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DaySelector from "@/widgets/meeting/daySelector";
import { useMeetingStore } from "@/store/meetingStore";
import type { DayType } from "@/store/meetingStore";
import AnimatedPageLayout from "@/shared/layout";
const dayKoreanToEnglish: { [key: string]: DayType } = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
  평일: "WEEKDAY",
  주말: "WEEKEND",
};

const Step1_2_2Page = () => {
  const navigate = useNavigate();
  const { meetDays, setMeetDays } = useMeetingStore();
  const selectedDay = meetDays[0] || null;

  const handleNext = () => {
    navigate("/Plaza/step1_3");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleSelectDay = (dayInKorean: string) => {
    const dayInEnglish = dayKoreanToEnglish[dayInKorean];

    const newSelectedDay = selectedDay === dayInEnglish ? null : dayInEnglish;

    setMeetDays(newSelectedDay ? [newSelectedDay] : []);
  };

  const isNextDisabled = !selectedDay;

  return (
    <AnimatedPageLayout>
      <StepFormLayout
        title="어떤 요일에 모일 예정인가요?"
        subtitle="모임 예정 요일을 모두 선택해주세요"
        onNext={handleNext}
        onPrev={handlePrev}
        isNextDisabled={isNextDisabled}
      >
        <DaySelector selectedDay={selectedDay} onSelect={handleSelectDay} />
      </StepFormLayout>
    </AnimatedPageLayout>
  );
};

export default Step1_2_2Page;
