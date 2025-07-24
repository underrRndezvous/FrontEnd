import MeetingStart from "@/widgets/meeting/meetingStart";
import { useNavigate } from "react-router-dom";

const Step0_Page = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/Plaza/step1_1");
  };
  return (
    <main className="h-screen w-full">
      <MeetingStart onStart={handleStart} />
    </main>
  );
};

export default Step0_Page;
