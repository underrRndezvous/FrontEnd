import React from "react";
import StepNavigation from "@/widgets/common/stepNavigation";

// 이전, 다음 버튼 레이아웃
interface StepFormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
}

const StepFormLayout = ({
  children,
  title,
  subtitle,
  onNext,
  onPrev,
  isNextDisabled,
}: StepFormLayoutProps) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative flex h-[600px] w-full max-w-sm flex-col rounded-lg bg-gradient-to-b from-sub01 to-sub02 p-6">
        <div className="text-center mt-12">
          <h1 className="title-02 text-black mb-2">{title}</h1>
          <p className="body-02 text-gray3">{subtitle}</p>
        </div>
        <main className="flex flex-1 flex-col items-center justify-center mb-20">
          {children}
        </main>

        <div className="absolute bottom-6 left-6 right-6">
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
