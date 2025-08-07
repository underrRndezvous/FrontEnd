import React from "react";
import StepNavigation from "@/widgets/common/stepNavigation";
import clsx from "clsx";

interface StepFormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  isScrollable?: boolean;
  contentAlignment?: "center" | "start";
  prevButtonText?: string;
  nextButtonText?: string;
}

const StepFormLayout = ({
  children,
  title,
  subtitle,
  onNext,
  onPrev,
  isNextDisabled,
  isScrollable = false,
  contentAlignment = "center",
  prevButtonText = "이전",
  nextButtonText = "다음",
}: StepFormLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative flex w-screen flex-col bg-gradient-to-b from-sub01 to-sub02 p-6 h-screen sm:w-[375px] sm:h-[645px] sm:rounded-lg">
        <div className="text-center mt-12">
          <h1 className="title-02 text-black mb-2">{title}</h1>
          <p className="body-02 text-gray3">{subtitle}</p>
        </div>
        <main
          className={clsx(
            "flex flex-1 flex-col items-center py-4",
            contentAlignment === "center" ? "justify-center" : "justify-start",
            isScrollable && "overflow-y-auto"
          )}
        >
          {children}
        </main>
        <div className="w-full">
          <StepNavigation
            onNext={onNext}
            onPrev={onPrev}
            isNextDisabled={isNextDisabled}
            prevText={prevButtonText}
            nextText={nextButtonText}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFormLayout;
