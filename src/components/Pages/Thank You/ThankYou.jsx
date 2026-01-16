import { Link } from "react-router-dom";

const ThankYou = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT: ORDER DETAILS */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600">
                        🎉 Order Placed Successfully
                    </h1>

                    <p className="text-center text-gray-500 mt-2 text-sm">
                        Order ID:
                        <span className="font-medium text-gray-700 ml-1">
                            ORD-{Date.now()}
                        </span>
                    </p>

                    {/* ITEMS */}
                    <div className="mt-8 space-y-5">
                        <div className="flex justify-between items-center border-b pb-4">
                            <div>
                                <p className="font-medium text-gray-800">
                                    Lorem ipsum dolor sit.
                                </p>
                                <p className="text-sm text-gray-500">
                                    Qty: 10
                                </p>
                            </div>

                            <span className="font-semibold text-gray-800">
                                ₹{Math.random().toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/products"
                            className="flex-1 text-center bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
                        >
                            Continue Shopping
                        </Link>

                        <Link
                            to="/orders"
                            className="flex-1 text-center border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
                        >
                            My Orders
                        </Link>
                    </div>
                </div>

                {/* RIGHT: PRICE SUMMARY */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 h-fit">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                        Price Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹12,000</span>
                        </div>

                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- ₹500</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
                            <span>Total</span>
                            <span>₹12,000</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ThankYou;
