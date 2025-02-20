import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className=" flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for might have been removed, moved, or never existed.
        </p>
        
        {/* Home Return Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
          text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
          transition-colors duration-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;