import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div className="text-center lg:text-left">
                    <h1 className="text-7xl sm:text-8xl font-extrabold text-gray-800 tracking-tight animate-bounce">
                        404
                    </h1>

                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-700">
                        Oops! Page not found
                    </h2>

                    <p className="mt-3 text-gray-500 max-w-md mx-auto lg:mx-0">
                        The page you’re looking for doesn’t exist or might have been moved.
                        Let’s get you back to shopping 🛒
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/"
                            className="px-8 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition transform hover:-translate-y-1"
                        >
                            🏠 Back to Home
                        </Link>

                        <Link
                            to="/products"
                            className="px-8 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition transform hover:-translate-y-1"
                        >
                            🛍 Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* RIGHT ILLUSTRATION */}
                <div className="relative flex justify-center">
                    <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white shadow-xl flex items-center justify-center">

                        {/* Animated Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-300 animate-spin-slow"></div>

                        {/* Center Icon */}
                        <div className="text-center">
                            <div className="text-6xl mb-4 animate-pulse">
                                🛒
                            </div>
                            <p className="text-gray-600 font-medium">
                                Nothing here to buy
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* CUSTOM ANIMATION */}
            <style>
                {`
                    .animate-spin-slow {
                        animation: spin 12s linear infinite;
                    }
                `}
            </style>
        </div>
    );
};

export default PageNotFound;
