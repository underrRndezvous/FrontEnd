import React from "react";
import Button from "@/shared/ui/Button";

interface StepNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  prevText?: string;
  nextText?: string;
  isPrevDisabled?: boolean;
  isScrollable?: boolean;
  contentAlignment?: "center" | "start";
}

const StepNavigation = ({
  onNext,
  onPrev,
  isNextDisabled = false,
  prevText = "이전",
  nextText = "다음",
  isPrevDisabled = false,
}: StepNavigationProps) => {
  return (
    <div className="flex w-full gap-x-5 py-2 px-2">
      <Button
        format="Button2"
        color="secondary"
        onClick={onPrev}
        disabled={isPrevDisabled}
      >
        {prevText}
      </Button>
      <Button
        format="Button2"
        color="primary"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {nextText}
      </Button>
    </div>
  );
};

export default StepNavigation;
