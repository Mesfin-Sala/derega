import { useContext, useEffect, useState, useMemo } from "react";
import { courseCategories } from "@/config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules"
import banner from "../../../../public/banner-img.png";
import freepik1 from "../../../../public/freepik1.png";
import freepik2 from "../../../../public/freepik2.png";
import freepik3 from "../../../../public/freepik3.png";
import vv from "../../../../public/vv.jpg";
import { Button } from "@/components/ui/button";import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch courses
  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  // Navigate by category
  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = { category: [getCurrentId] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  // Navigate by course
  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );
    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  // Search logic
  const filteredCourses = useMemo(() => {
    if (!searchTerm) return studentViewCoursesList;
    return studentViewCoursesList.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, studentViewCoursesList]);

  // Contact form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form data: ", data);
    reset();
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4 lg:px-8">
        {/* Decorative Background Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl animate-pulse -z-10"></div>
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-purple-200 opacity-30 rounded-full blur-3xl animate-pulse -z-10"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2 lg:pr-12 text-center lg:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              🚀 New Courses Added Weekly
            </motion.span>

            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Learning that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                gets you
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto lg:mx-0">
              Skills for your present and your future. <br />
              Join thousands of learners growing with us.
            </p>

            <motion.button
              onClick={() => navigate("/courses")}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Courses
            </motion.button>
          </motion.div>

          {/* Right Image Slider */}
          <motion.div
            className="relative lg:w-1/2 mt-10 lg:mt-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow behind slider */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-300 to-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-2xl shadow-2xl"
            >
              {[freepik1, freepik2, freepik3, vv].map(
                (img, index) => (
                  <SwiperSlide key={index}>
                    {/* Card container */}
                    <div className="relative w-full h-[460px] lg:h-[420px] overflow-hidden rounded-2xl">
                      <motion.img
                        src={img}
                        alt={`Slide ${index}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                        whileHover={{ scale: 1.03 }}
                      />
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="relative py-24 px-4 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl animate-pulse -z-10" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl animate-pulse -z-10" />

        <motion.h2
          className="text-4xl font-bold mb-14 text-center text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Course Categories
        </motion.h2>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {courseCategories.map((categoryItem) => (
            <motion.div
              key={categoryItem.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.97 }}
              className="group relative p-8 bg-white rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300"
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              aria-label={`Go to ${categoryItem.label} category`}
            >
              {/* Gradient Ring Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-purple-500/0 group-hover:from-blue-400/5 group-hover:to-purple-500/5 transition-all duration-500" />

              {/* Icon */}
              <motion.div
                className="relative w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl shadow-lg"
                whileHover={{ rotate: 5, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  {categoryItem.icon || "📚"}
                </motion.span>
              </motion.div>

              {/* Label */}
              <p className="font-semibold text-center text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                {categoryItem.label}
              </p>

              {/* Description Tooltip */}
              {categoryItem.description && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-md transition-opacity duration-300 w-44 text-center pointer-events-none"
                >
                  {categoryItem.description}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/courses")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-colors duration-300"
          >
            View All Courses
          </button>
        </motion.div>
      </section>

      <section className="py-12 px-4 lg:px-8 bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Featured Courses
        </h2>

        <input
          type="text"
          placeholder="Search courses..."
          className="border border-blue-300 p-3 rounded-lg w-full md:w-1/3 mb-6 mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((courseItem) => (
              <motion.div
                key={courseItem._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={courseItem?.image || "/placeholder.jpg"} // Placeholder for missing images
                  width={300}
                  height={150}
                  alt={courseItem?.title || "Course Image"}
                  className="w-full h-40 object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold mb-2 text-lg text-blue-800">
                    {courseItem?.title || "Course Title"}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName || "Instructor Name"}
                  </p>
                  <p className="font-bold text-[16px] text-blue-600">
                    ${courseItem?.pricing || "N/A"}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <h1 className="col-span-full text-center text-gray-500">
              No Courses Found
            </h1>
          )}
        </div>
      </section>
      {/* About Us */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -z-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full opacity-20 -z-10 blur-3xl"></div>

        {/* Section Header */}
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>

        {/* Intro Text */}
        <motion.p
          className="text-gray-700 max-w-4xl mx-auto text-center mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We are dedicated to empowering students with quality education and
          skills for the future. Our platform provides diverse courses designed
          by industry experts to help learners grow and succeed.
        </motion.p>

        {/* Key Features / Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "👨‍🏫",
              title: "Expert Instructors",
              description:
                "Learn from industry professionals with real-world experience.",
            },
            {
              icon: "⏰",
              title: "Flexible Learning",
              description: "Access courses anytime, anywhere at your own pace.",
            },
            {
              icon: "📜",
              title: "Certifications",
              description:
                "Earn certificates to showcase your skills and achievements.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 text-center">
          <motion.button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/about")}
          >
            Learn More About Us
          </motion.button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-4 lg:px-8 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 opacity-20 rounded-full blur-3xl -z-10"></div>

        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <motion.p
          className="text-gray-700 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have questions or feedback? Fill out the form and we’ll get back to
          you shortly.
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left Info Block */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span>+251 900 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <span>support@yourwebsite.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
            {/* Social icons */}
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                🌐
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                📘
              </a>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Advanced Footer with Social Media */}
      <footer className="bg-gray-900 text-gray-300 pt-12">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo / About */}
            <div>
              <h3 className="text-white text-xl font-bold mb-4">MyLearning</h3>
              <p className="text-sm mb-4">
                Empowering students with quality education and skills for the
                future. Join thousands of learners worldwide.
              </p>
              <div className="flex space-x-4 text-xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/courses" className="hover:underline">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/help" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/refund" className="hover:underline">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Newsletter
              </h3>
              <p className="text-sm mb-4">
                Subscribe to get the latest courses, news, and updates.
              </p>
              <form className="flex flex-col sm:flex-row sm:space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none mb-2 sm:mb-0"
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MyLearning. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentHomePage;
