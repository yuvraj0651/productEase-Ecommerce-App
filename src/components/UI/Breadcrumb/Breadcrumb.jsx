import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    const formatLabel = (text) =>
        text
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <section className="w-full bg-gradient-to-r from-gray-100 to-gray-200 border-b">
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Page Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
                    {pathnames.length
                        ? isNaN(pathnames[pathnames.length - 1])
                            ? formatLabel(pathnames[pathnames.length - 1])
                            : "Product Details"
                        : "Home"}
                </h1>

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center justify-center flex-wrap text-sm text-gray-600">

                        <li className="flex items-center">
                            <Link to="/" className="font-medium hover:text-black">
                                Home
                            </Link>
                        </li>

                        {pathnames.map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={to} className="flex items-center">
                                    <ChevronRight size={16} className="mx-2 text-gray-400" />
                                    {isLast ? (
                                        <span className="font-semibold text-black">
                                            {isNaN(value) ? formatLabel(value) : "Details"}
                                        </span>
                                    ) : (
                                        <Link
                                            to={to}
                                            className="font-medium hover:text-black"
                                        >
                                            {formatLabel(value)}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>

            </div>
        </section>
    );
};

export default Breadcrumb;
