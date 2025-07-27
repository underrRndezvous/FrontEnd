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
      className="h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MeetingStart onStart={handleStart} />
    </motion.main>
  );
};

export default Step0_Page;
