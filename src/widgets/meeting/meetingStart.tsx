import Button from "@/shared/ui/Button";
import characterImage from "@/shared/asset/images/character.png";

interface MeetingStartProps {
  onStart: () => void;
}

const MeetingStart = ({ onStart }: MeetingStartProps) => {
  return (
    <div className="grid h-full grid-rows-[1fr_auto] p-6 text-center">
      <div className="flex flex-col items-center justify-center overflow-y-auto">
        <h1 className="title-01 mb-2 text-black">
          모임의 모든 것,
          <br />
          PLAZA에서 쉽고 빠르게
        </h1>
        <p className="title-03 mb-12 text-gray4">
          모임에 딱 맞는 장소, 컨텐츠를 찾을 수 있어요!
        </p>
        <img
          src={characterImage}
          alt="캐릭터"
          className="w-60 animate-bounce"
        />
      </div>
      <div className="w-full px-4 pt-6">
        <Button format="Button1" color="primary" onClick={onStart}>
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default MeetingStart;
