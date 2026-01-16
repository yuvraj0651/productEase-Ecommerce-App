import Shimmer from "../UI/Shimmer/Shimmer";

const ProductsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Title */}
            <Shimmer className="h-8 w-52 mb-8" />

            {/* Filters */}
            <div className="flex gap-4 mb-8">
                <Shimmer className="h-10 w-32" />
                <Shimmer className="h-10 w-32" />
                <Shimmer className="h-10 w-32" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border rounded-xl p-4 shadow-sm">
                        <Shimmer className="h-48 w-full mb-4 rounded-lg" />
                        <Shimmer className="h-4 mb-2" />
                        <Shimmer className="h-4 w-3/4 mb-3" />
                        <Shimmer className="h-5 w-24 mb-4" />
                        <div className="flex gap-3">
                            <Shimmer className="h-10 flex-1" />
                            <Shimmer className="h-10 w-10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsSkeleton;
