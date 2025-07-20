import Button1 from "@/shared/ui/Button1";
import characterImage from "@/shared/asset/images/character.png";

const MeetingStart = () => {
  const handleStart = () => {
    console.log("시작하기 버튼 클릭 시");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h1 className="title-01 mb-2 text black">
        모임의 모든 것,
        <br />
        PLAZA에서 쉽고 빠르게
      </h1>

      <p className="title-03 mb-12 text-gray4">
        모임에 딱 맞는 장소, 컨텐츠를 찾을 수 있어요!
      </p>

      <img src={characterImage} alt="캐릭터" className="mb-24 w-60" />

      <div className="w-full max-w-sm px-4">
        <Button1 onClick={handleStart}>시작하기</Button1>
      </div>
    </div>
  );
};

export default MeetingStart;
