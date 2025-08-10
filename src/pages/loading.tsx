import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMeetingStore } from "@/store/meetingStore";
import { useMutation } from "@tanstack/react-query";
import { postMeetingInfo } from "@/shared/api/meetingApi";
import characterImg from "@/shared/asset/images/character.png";

const LoadingPage = () => {
  const navigate = useNavigate();
  const groupName = useMeetingStore((state) => state.groupName);
  // ✅ 1. 스토어에서 필요한 '데이터'만 명시적으로 가져옵니다.
  // const meetingData = useMeetingStore((state) => ({
  //   groupName: state.groupName,
  //   groupPurpose: state.groupPurpose,
  //   selectedTimes: state.selectedTimes,
  //   places: state.places,
  //   departures: state.departures,
  // }));

  // ✅ 2. useMutation 사용법을 최신 방식으로 수정합니다.
  // const { mutate, isPending } = useMutation({
  //   mutationFn: postMeetingInfo, // API 함수를 mutationFn으로 전달
  //   onSuccess: (data) => {
  //     navigate("/step2", { state: { recommendations: data } });
  //   },
  //   onError: (error) => {
  //     console.error("추천 장소 조회 실패:", error);
  //     // TODO: 실패 페이지나 재시도 로직 처리
  //   },
  // });

  // useEffect(() => {
  //   const meetingData = useMeetingStore.getState();
  //   mutate({
  //       groupName: meetingData.groupName,
  //       groupPurpose: meetingData.groupPurpose,
  //       selectedTimes: meetingData.selectedTimes,
  //       places: meeting.places,
  //       departures: meetingData.departures,
  //   });
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div
        className=" bg-white w-full flex flex-col items-center text-center "
        style={{ width: "375px", height: "645px" }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
        <div className="mt-24">
          <h1 className="text-lg font-bold">
            <span className="text-black">{groupName || "모임명"}</span>
            의
            <br />
            모임 장소와 컨텐츠를 찾고 있어요!
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            최대 3개까지 모임 장소를 추천 받을 수 있어요
          </p>
          <img
            src={characterImg}
            alt="캐릭터"
            className="w-40 h-40 mt-20 animate-bounce mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
