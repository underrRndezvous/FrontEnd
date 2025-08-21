import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MeetingStart from "@/widgets/meeting/meetingStart";

const Step0_Page = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/Plaza/step1_1");
  };

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-gray-100 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative flex flex-col bg-white 
                    w-screen h-screen sm:w-[375px] sm:h-[645px] sm:rounded-lg
                    pt-[env(safe-area-inset-top)] sm:pt-4
                    pb-[env(safe-area-inset-bottom)] sm:pb-2"
      >
        <MeetingStart onStart={handleStart} />
      </div>
    </motion.div>
  );
};

export default Step0_Page;
