import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMeetingStore } from "@/store/meetingStore";
import { useRecommendPlaces } from "@/shared/api/meetingApi";
import characterImg from "@/shared/asset/images/character.png";

const IconClose = () => (
  <svg
    className="h-6 w-6 stroke-current text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const LoadingPage = () => {
  const navigate = useNavigate();
  const { groupName } = useMeetingStore.getState();
  const { mutate, data, isSuccess, isError, error } = useRecommendPlaces();

  useEffect(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/Plaza/step2", { state: { recommendations: data.regions } });
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("추천 장소 조회 실패:", error);
      alert("추천 장소를 찾는 데 실패했어요. 이전 페이지로 돌아갑니다.");
      navigate(-1);
    }
  }, [isError, error, navigate]);

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-gray-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative flex w-screen flex-col items-center justify-center rounded-lg bg-gradient-to-b from-sub01 to-sub02 p-6 text-center h-screen sm:w-[375px] sm:h-[645px]">
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6">
          <IconClose />
        </button>

        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="title-02 text-black mb-2">
            <span className="text-white">{groupName || "모임"}</span>
            의
            <br />
            모임 장소와 컨텐츠를 찾고 있어요!
          </h1>

          <img
            src={characterImg}
            alt="캐릭터"
            className="my-8 w-48 animate-bounce"
          />

          <p className="body-02 text-gray3">
            최대 3개까지 장소를 추천 받을 수 있어요
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
