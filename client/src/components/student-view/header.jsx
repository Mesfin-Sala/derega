import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-blue-600">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="font-extrabold text-blue-600 text-lg">SolutionTutor</span>
        </Link>

        <Button
          variant="ghost"
          onClick={() => navigate("/courses")}
          className="text-lg font-medium hover:text-blue-600"
        >
          Explore Courses
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div
          onClick={() => navigate("/student-courses")}
          className="cursor-pointer hover:text-blue-600"
        >
          <span className="font-extrabold text-lg">My Courses</span>
        </div>
        <Button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
