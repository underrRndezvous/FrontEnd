import Button from "@/shared/ui/Button";
import characterImage from "@/shared/asset/images/character.png";

interface MeetingStartProps {
  onStart: () => void;
}

const MeetingStart = ({ onStart }: MeetingStartProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mt-28"></div>
      <h1 className="title-01 mb-2 text black">
        모임의 모든 것,
        <br />
        PLAZA에서 쉽고 빠르게
      </h1>

      <p className="title-03 mb-8 text-gray4">
        모임에 딱 맞는 장소, 컨텐츠를 찾을 수 있어요!
      </p>

      <img src={characterImage} alt="캐릭터" className="mb-16 w-60" />

      <div className="w-full max-w-sm px-2 mb-24">
        <Button format="Button1" color="primary" onClick={onStart}>
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default MeetingStart;
