import { Settings } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <header className="p-4 flex justify-between items-center">
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            HOME
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            ABOUT US
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            PRICING
          </a>
        </nav>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Log In
          </button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50">
            Sign Up
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Personalized Health Companion
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your personalized healthcare companion for managing and improving
            your well-being effortlessly.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 flex items-center">
            Explore <Settings className="ml-2" size={20} />
          </button>
        </div>
        <div className="md:w-1/2 relative">
          <div className="w-full h-96 bg-blue-200 rounded-lg overflow-hidden relative">
            <img
              src="/api/placeholder/600/400"
              alt="Healthcare Professional"
              className="absolute bottom-0 right-0 w-3/4 h-auto object-cover"
            />
            <div className="absolute top-4 right-4 w-16 h-32 bg-white rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-600">
                <path
                  fill="currentColor"
                  d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
