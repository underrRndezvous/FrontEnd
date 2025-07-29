import MeetingStart from "@/widgets/meeting/meetingStart";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Step0_Page = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/Plaza/step1_1");
  };
  return (
    <motion.main
      className="flex h-screen w-full items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex h-[600px] w-full max-w-sm flex-col items-center justify-center rounded-lg bg-white p-6">
        <MeetingStart onStart={handleStart} />
      </div>
    </motion.main>
  );
};

export default Step0_Page;
