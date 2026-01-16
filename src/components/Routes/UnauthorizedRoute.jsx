import { Link } from "react-router-dom";

const UnauthorizedRoute = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 text-center animate-fadeIn">

                {/* ICON */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100 animate-pulse">
                        <span className="text-4xl">🚫</span>
                    </div>
                </div>

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Access Denied
                </h1>

                {/* DESCRIPTION */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                    You don’t have permission to access this page.
                    <br />
                    Please contact the administrator or login with an authorized account.
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/account"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
                    >
                        Login Again
                    </Link>
                </div>

                {/* FOOTER NOTE */}
                <p className="text-xs text-gray-400 mt-6">
                    Error Code: 403 • Unauthorized Access
                </p>
            </div>
        </div>
    );
};

export default UnauthorizedRoute;
