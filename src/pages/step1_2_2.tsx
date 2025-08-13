import React from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DaySelector from "@/widgets/meeting/daySelector";
// 1. DayType과 useMeetingStore를 import 합니다.
import { useMeetingStore } from "@/store/meetingStore";
import type { DayType } from "@/store/meetingStore";

// 2. 한글 요일을 DayType으로 변환하기 위한 객체를 정의합니다.
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
  // 3. 스토어에서 직접 meetDays와 setMeetDays를 가져와 사용합니다.
  const { meetDays, setMeetDays } = useMeetingStore();

  const handleNext = () => {
    navigate("/Plaza/step1_3");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  // 4. DaySelector에서 클릭된 한글 요일(dayInKorean)을 받아 처리하는 로직으로 수정합니다.
  const handleSelectDay = (dayInKorean: string) => {
    // 클릭된 한글 요일을 DayType(영문)으로 변환합니다.
    const dayInEnglish = dayKoreanToEnglish[dayInKorean];

    // 이미 선택된 요일인지 DayType 배열(meetDays)에서 확인합니다.
    const newSelectedDays = meetDays.includes(dayInEnglish)
      ? meetDays.filter((d) => d !== dayInEnglish)
      : [...meetDays, dayInEnglish];

    // 변환된 DayType 배열을 전역 스토어에 저장합니다.
    setMeetDays(newSelectedDays);
  };

  const isNextDisabled = meetDays.length === 0;

  return (
    <StepFormLayout
      title="어떤 요일에 모일 예정인가요?"
      subtitle="모임 예정 요일을 모두 선택해주세요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
    >
      {/* DaySelector에는 DayType 배열(meetDays)을 그대로 넘겨줍니다. */}
      <DaySelector selectedDays={meetDays} onSelect={handleSelectDay} />
    </StepFormLayout>
  );
};

export default Step1_2_2Page;
