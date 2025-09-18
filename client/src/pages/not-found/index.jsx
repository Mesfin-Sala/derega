import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 text-center px-6">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-2xl font-semibold text-gray-800"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-2 text-gray-600 max-w-md"
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back on track!
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Button
          size="lg"
          className="px-8 py-4 rounded-2xl text-lg font-semibold text-white 
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 
            shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => navigate("/")}
        >
          ⬅️ Back to Home
        </Button>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
