import React from "react";
import Button from "@/shared/ui/Button";

interface StepNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  prevText?: string; // ✅ 이전 버튼 텍스트 prop 추가
  nextText?: string;
}

const StepNavigation = ({
  onNext,
  onPrev,
  isNextDisabled = false,
  prevText = "이전", // 기본값
  nextText = "다음", // 기본값
}: StepNavigationProps) => {
  return (
    <div className="flex w-full gap-x-5 py-6 px-2">
      <Button format="Button2" color="secondary" onClick={onPrev}>
        이전
      </Button>
      <Button
        format="Button2"
        color="primary"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        다음
      </Button>
    </div>
  );
};

export default StepNavigation;
