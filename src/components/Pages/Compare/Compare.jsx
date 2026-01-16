import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCompare, removeFromCompare } from "../../redux/Slice/CompareSlice";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { addToCart } from "../../redux/Slice/CartSlice";

const Compare = () => {

    const dispatch = useDispatch();
    const compareItems = useSelector((state) => state.compare.compareItems);

    const removeProductHandler = (id) => {
        dispatch(removeFromCompare({ id }));
    };

    const addProductHandler = (product) => {
        dispatch(addToCart(product));
    };

    const clearCompareHandler = () => {
        dispatch(clearCompare());
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <Breadcrumb />
            {/* PAGE TITLE */}
            <div className="flex flex-col sm:flex-row sm:items-center mt-[2rem] sm:justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold">Compare Products</h1>
                <div>
                    <Link to="/products">
                        <button className="text-sm text-gray-600 hover:underline">
                            ← Continue Shopping
                        </button>
                    </Link>
                    {
                        compareItems.length > 0 && (
                            <div className="clear-compare-block pr-[2rem] mt-[2rem]">
                                <button
                                    onClick={clearCompareHandler}
                                    className="border border-[#ccc] shadow-sm shadow-[#ccc] py-2 px-7 uppercase rounded-[5px] tracking-wide font-[600] bg-black text-white text-[0.8rem] transition duration-300 hover:bg-slate-50 hover:text-black hover:border-gray-400">clear compare</button>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* EMPTY STATE */}
            <div className="hidden text-center py-20">
                <p className="text-gray-500 text-lg">No products to compare</p>
            </div>

            {/* COMPARE TABLE */}
            <section className="overflow-x-auto">
                <div className="min-w-[900px] border rounded-2xl bg-white">

                    {/* PRODUCT HEADER */}
                    <div className="grid grid-cols-4 border-b">
                        {/* <div className="p-6 font-medium text-gray-500">Product</div> */}
                        {
                            compareItems.length === 0 ? (
                                <div className="col-span-full flex justify-center items-center h-20">
                                    <h4 className="text-center tracking-wide font-[500] mt-[1rem]">No Compare Products To Show</h4>
                                </div>
                            ) : (
                                compareItems.map((item) => (
                                    <div key={item.id} className="p-6 border-l">
                                        <div className="w-full h-40 bg-gray-100 rounded-xl mb-4" >
                                            <div className="compare-picture flex items-center h-full justify-center">
                                                <img src={item.image} alt={item.title} className="w-[6.5rem]" />
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-lg">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2 line-clamp-3">
                                            {item.description}
                                        </p>
                                        <p className="font-bold text-lg">₹{item.price}</p>

                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => addProductHandler(item)}
                                                className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50">
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => removeProductHandler(item.id)}
                                                className="text-red-500 text-sm hover:underline">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>

                    {/* SPEC ROW */}
                    <CompareRow label="Brand" values={["Sony", "Boat", "JBL"]} />
                    <CompareRow label="Rating" values={["4.5 ★", "4.2 ★", "4.6 ★"]} />
                    <CompareRow label="Price" values={["₹4,999", "₹3,499", "₹5,999"]} />
                    <CompareRow label="Bluetooth" values={["5.2", "5.0", "5.3"]} />
                    <CompareRow label="Battery Life" values={["30 hrs", "28 hrs", "40 hrs"]} />
                    <CompareRow label="Noise Cancellation" values={["Yes", "No", "Yes"]} />
                    <CompareRow label="Warranty" values={["1 Year", "1 Year", "2 Years"]} />

                </div>
            </section>
        </main>
    );
};

export default Compare;

/* ---------- ROW COMPONENT ---------- */

const CompareRow = ({ label, values }) => {
    return (
        <div className="grid grid-cols-4 border-t">
            <div className="p-6 font-medium text-gray-600 bg-gray-50">
                {label}
            </div>

            {values.map((value, index) => (
                <div
                    key={index}
                    className="p-6 border-l text-gray-700"
                >
                    {value}
                </div>
            ))}
        </div>
    );
};
