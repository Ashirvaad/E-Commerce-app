import { Link } from "react-router-dom";
import { IconMoodSad, IconHome } from "@tabler/icons-react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-6 text-center">
      {/* Floating Icon */}
      <div className="animate-bounce">
        <IconMoodSad className="h-20 w-20 text-purple-500 mb-4" />
      </div>

      {/* Heading */}
      <h1 className="text-7xl font-extrabold text-gray-800 mb-2">404</h1>
      <p>
        Page Not Found
      </p>
       <br></br>

      <p className="text-lg text-gray-600 mb-6">
        Uh-oh! Looks like you’re lost in the art gallery 🎨
      </p>  
     
      {/* Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow hover:scale-105 transition-transform"
      >
        <IconHome className="h-5 w-5" />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
