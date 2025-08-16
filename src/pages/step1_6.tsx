import { useNavigate } from "react-router-dom";

import MeetingSummary from "@/widgets/meeting/meetingSummary";
import { useMeetingStore } from "@/store/meetingStore";
import AnimatedPageLayout from "@/shared/layout";
import StepNavigation from "@/widgets/common/stepNavigation";
const Step1_6Page = () => {
  const navigate = useNavigate();
  const meetingData = useMeetingStore();

  const handleRecommend = () => {
    navigate("/Plaza/loading");
  };

  const handleEdit = () => {
    navigate("/Plaza/editMeetingPage");
  };

  return (
    <AnimatedPageLayout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="relative grid w-screen grid-rows-[auto_1fr_auto] bg-gradient-to-b from-sub01 to-sub02 p-6 h-screen sm:w-[375px] sm:h-[645px] sm:rounded-lg">
          <div className="text-center mt-6">
            <h1 className="title-02 text-black mb-2">
              {` ${meetingData.groupName}  의\n모임 장소를 추천해드릴게요`}
            </h1>
            <p className="body-02 text-gray3">
              정보가 맞는지 한 번 더 확인해주세요
            </p>
          </div>

          <main className="flex flex-col items-center justify-center overflow-y-auto">
            <MeetingSummary />
          </main>

          <div className="w-full pt-4">
            {" "}
            <StepNavigation
              onNext={handleRecommend}
              onPrev={handleEdit}
              isNextDisabled={false}
              prevText="수정하기"
              nextText="추천받기"
              isPrevDisabled={false}
            />
          </div>
        </div>
      </div>
    </AnimatedPageLayout>
  );
};

export default Step1_6Page;
