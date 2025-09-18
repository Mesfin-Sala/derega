import { motion } from "framer-motion";

function Spinner({ size = 24, color = "text-purple-500" }) {
  return (
    <motion.div
      className={`animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-${size / 6} ${color}`}
      style={{
        width: size,
        height: size,
        borderTopColor: "currentColor",
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
}

export default Spinner;
