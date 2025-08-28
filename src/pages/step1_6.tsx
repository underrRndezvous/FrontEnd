import { useNavigate } from "react-router-dom";
import MeetingSummary from "@/widgets/meeting/meetingSummary";
import { useMeetingStore } from "@/store/meetingStore";
import AnimatedPageLayout from "@/shared/layout";
import StepNavigation from "@/widgets/common/stepNavigation";
import { useRecommendPlaces } from "@/shared/api/meetingApi";

const Step1_6Page = () => {
  const navigate = useNavigate();
  const meetingData = useMeetingStore();
  console.log("=== Step6 데이터 확인 ===");
  console.log("meetingData.place:", meetingData.place);
  meetingData.place.forEach((place, index) => {
    console.log(`장소 ${index + 1}:`, {
      id: place.id,
      placeType: place.placeType,
      typeDetail: place.typeDetail,
      atmosphere: place.atmosphere,
    });
  });

  const { mutate: recommendPlaces, isPending } = useRecommendPlaces();

  const handleRecommend = () => {
    navigate("/Plaza/loading");

    recommendPlaces(undefined, {
      onSuccess: (data) => {
        const { regions, meetingId } = data;

        console.log(" 추천 성공! meetingId:", meetingId);

        navigate("/plaza/step2", {
          state: {
            recommendations: regions,
            meetingId: meetingId,
          },
          replace: true,
        });
      },
      onError: (error) => {
        console.error("장소 추천에 실패했습니다:", error);
        alert("장소 추천에 실패했습니다. 다시 시도해주세요.");

        navigate(-1);
      },
    });
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
            <StepNavigation
              onNext={handleRecommend}
              onPrev={handleEdit}
              isNextDisabled={isPending}
              prevText="수정하기"
              nextText={isPending ? "추천받는 중..." : "추천받기"}
              isPrevDisabled={false}
            />
          </div>
        </div>
      </div>
    </AnimatedPageLayout>
  );
};

export default Step1_6Page;
