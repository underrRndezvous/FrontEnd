import Button from "@/shared/ui/Button";
import logoImage from "@/shared/asset/images/logo.png";
import plazaVideo from "@/shared/asset/images/plaza_video.mp4";
interface MeetingStartProps {
  onStart: () => void;
}

const MeetingStart = ({ onStart }: MeetingStartProps) => {
  return (
    <div className="relative grid h-full grid-rows-[auto_1fr_auto] p-4 sm:p-6 text-center">
      <div className="absolute top-4 left-4 sm:top-4 sm:left-6">
        <img
          src={logoImage}
          alt="PLAZA 로고"
          className="h-12 sm:h-12 object-contain"
        />
      </div>

      <div className="pt-20 sm:pt-24 md:pt-14">
        <h1 className="title-01 mb-2 text-black">
          모임의 모든 것,
          <br />
          PLAZA에서 쉽고 빠르게
        </h1>
        <p className="title-03 mb-6 sm:mb-12 text-gray4 min-w-max">
          모임에 딱 맞는 장소, 컨텐츠를 찾을 수 있어요!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-0 -mt-8">
        <video
          src={plazaVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-48 sm:w-60 object-contain bg-transparent rounded-none border-none"
          style={{
            backgroundColor: "transparent",
            mixBlendMode: "multiply",
          }}
        >
          동영상을 지원하지 않는 브라우저입니다.
        </video>
      </div>

      <div className="w-full px-2 sm:px-4 pb-10 sm:pb-4 md:pb-4">
        <Button format="Button1" color="primary" onClick={onStart}>
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default MeetingStart;
