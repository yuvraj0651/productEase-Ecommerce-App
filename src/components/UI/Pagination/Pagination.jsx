import React from "react";

const Pagination = React.memo(({ currentPage, setCurrentPage, pageNumbers, totalPages }) => {
    return (
        <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md border">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition">
                    ← Prev
                </button>
                {
                    pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`px-4 py-2 rounded-lg border transition
                                ${currentPage === number ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                            {number}
                        </button>
                    ))
                }
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition">
                    Next →
                </button>
            </div>
        </div>
    )
});

export default Pagination;