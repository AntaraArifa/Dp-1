import { motion } from "framer-motion";
import { Home, Settings, FileText, User, HelpCircle } from "lucide-react";

const SideButtons = () => {
  return (
    <div
      className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-teal-600 p-4 rounded-r-3xl shadow-lg z-50"
      style={{ width: "50px" }}
    >
      {/* Side Buttons Container */}
      <div className="flex flex-col items-center gap-6">
        {/* Home Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-400 transition-all"
        >
          <Home className="w-6 h-6" />
        </motion.button>

        {/* Profile Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-400 transition-all"
        >
          <User className="w-6 h-6" />
        </motion.button>

        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-400 transition-all"
        >
          <Settings className="w-6 h-6" />
        </motion.button>

        {/* Documents Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-400 transition-all"
        >
          <FileText className="w-6 h-6" />
        </motion.button>

        {/* Help Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-400 transition-all"
        >
          <HelpCircle className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default SideButtons;
