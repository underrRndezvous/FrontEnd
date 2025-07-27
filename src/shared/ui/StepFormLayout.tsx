import React from "react";
import StepNavigation from "@/widgets/common/stepNavigation";

// 이전, 다음 버튼 레이아웃
interface StepFormLayoutProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
}

const StepFormLayout = ({
  children,
  onNext,
  onPrev,
  isNextDisabled,
}: StepFormLayoutProps) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative flex h-[600px] w-full max-w-sm flex-col rounded-lg bg-sub01 p-6">
        <main className="flex flex-1 flex-col items-center justify-center">
          {children}
        </main>

        <div className="w-full">
          <StepNavigation
            onNext={onNext}
            onPrev={onPrev}
            isNextDisabled={isNextDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFormLayout;
