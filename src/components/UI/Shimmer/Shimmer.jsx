import React from "react";

const Shimmer = React.memo(({ className = "" }) => {
    return (
        <div
            className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
        >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
    );
});

export default Shimmer;
