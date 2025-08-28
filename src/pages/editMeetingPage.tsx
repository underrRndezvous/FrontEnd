import { useNavigate } from "react-router-dom";

import EditMeetingForm from "@/widgets/meeting/editMeetingForm";
import AnimatedPageLayout from "@/shared/layout";
import StepNavigation from "@/widgets/common/stepNavigation";
import { useMeetingStore } from "@/store/meetingStore";

const EditMeetingPage = () => {
  const navigate = useNavigate();
  const { startPoint, setStartPoint } = useMeetingStore();

  const handleSave = () => {
    const validDepartures = startPoint.filter((departure) => {
      const hasValue = [
        departure.first,
        departure.second,
        departure.third,
      ].some((part) => part && part.trim() !== "");
      return hasValue;
    });

    setStartPoint(validDepartures);

    navigate("/Plaza/step1_6");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <AnimatedPageLayout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="relative grid w-screen grid-rows-[auto_1fr_auto] bg-gradient-to-b from-sub01 to-sub02 p-6 h-screen sm:w-[375px] sm:h-[645px] sm:rounded-lg">
          <div className="text-center mt-6">
            <h1 className="title-02 text-black mb-2">정보 수정하기</h1>
            <p className="body-02 text-gray3">모임 정보를 수정할 수 있어요</p>
          </div>

          <main
            className="flex flex-col items-center  overflow-y-auto w-full mt-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <EditMeetingForm />
          </main>

          <div className="w-full pt-4">
            <StepNavigation
              onNext={handleSave}
              onPrev={handleCancel}
              nextText="저장"
              prevText="취소"
              isScrollable={true}
              contentAlignment="start"
            />
          </div>
        </div>
      </div>
    </AnimatedPageLayout>
  );
};

export default EditMeetingPage;
