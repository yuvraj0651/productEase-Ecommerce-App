import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { addToWishlist } from "../../redux/Slice/WishlistSlice";
import { addWishlistItem } from "../../API/Thunk/WishlistThunk";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { addingCart } from "../../API/Thunk/CartThunk";
import { clearCart, decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../redux/Slice/CartSlice";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.products.cartItems);
    console.log(cartItems);

    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    const tax = 299;

    const removeProductHandler = (id) => {
        dispatch(removeFromCart({ id }))
    };

    const incrementQuantityHandler = (id) => {
        dispatch(increaseCartQuantity({ id }));
    };

    const decrementQuantityHandler = (id) => {
        dispatch(decreaseCartQuantity({ id }));
    };

    const addToWishlistHandler = (product) => {
        dispatch(addToWishlist(product));
    };

    const addWishlistToApi = (product) => {
        dispatch(addWishlistItem(product));
    };

    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    const SubmitCartDataHandler = () => {
        if (cartItems.length === 0) return;

        const tax = 299;
        const discount = 500;

        const ordersPayload = {
            orderId: `ORD-${Date.now()}`,
            items: cartItems,
            totalAmount: totalPrice,
            tax,
            discount,
            grandTotal: Math.max(totalPrice + tax - discount, 0),
            orderDate: new Date().toLocaleDateString(),
            status: "Placed",
        };

        dispatch(addingCart(ordersPayload))
            .unwrap()
            .then(() => {
                navigate("/checkout");
            })
            .catch((error) => {
                console.error("Order failed:", error);
                alert("Something went wrong while placing the order");
            });
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <Breadcrumb />
            {/* PAGE TITLE */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-8 mt-10">Shopping Cart</h1>
                {
                    cartItems.length > 0 && (
                        <div className="clear-cart-block pr-[2rem]">
                            <button
                                onClick={clearCartHandler}
                                className="border border-[#ccc] shadow-sm shadow-[#ccc] py-2 px-7 uppercase rounded-[5px] tracking-wide font-[600] bg-black text-white text-[0.8rem] transition duration-300 hover:bg-slate-50 hover:text-black hover:border-gray-400">clear cart</button>
                        </div>
                    )
                }
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: CART ITEMS */}
                <section className="lg:col-span-2 space-y-6">

                    {/* CART ITEM */}
                    {
                        cartItems.length === 0 ? (
                            <h4 className="mt-[1rem] tracking-wide text-center font-[500]">No Products To Show</h4>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row gap-6 border rounded-2xl p-4 bg-white"
                                >
                                    {/* Image */}
                                    <div className="w-full flex justify-center sm:w-40 h-40 bg-gray-100 rounded-xl" >
                                        <img src={item.image} alt={item.title} className="w-[6.5rem] h-auto object-cover" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-3">
                                            {item.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4">
                                            {/* Quantity */}
                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    onClick={() => decrementQuantityHandler(item.id)}
                                                    className="px-3 py-1">-</button>
                                                <span className="px-4">{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementQuantityHandler(item.id)}
                                                    className="px-3 py-1">+</button>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeProductHandler(item.id)}
                                                className="text-red-500 text-sm hover:underline">
                                                Remove
                                            </button>

                                            {/* Wishlist */}
                                            <button
                                                onClick={() => {
                                                    addToWishlistHandler(item)
                                                    addWishlistToApi(item)
                                                }}
                                                className="text-sm text-gray-500 hover:underline">
                                                Move to Wishlist
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right min-w-[100px]">
                                        <p className="text-lg font-bold">₹{item.price}</p>
                                        <p className="text-sm text-gray-400 line-through">₹1,200</p>
                                    </div>
                                </div>
                            ))
                        )}
                </section>

                {/* RIGHT: ORDER SUMMARY */}
                <aside className="border rounded-2xl p-6 h-fit bg-white">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₹{tax}</span>
                        </div>
                    </div>

                    <div className="border-t my-6" />

                    <div className="flex justify-between font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>₹{(totalPrice + tax).toFixed(2)}</span>
                    </div>

                    <button
                        onClick={SubmitCartDataHandler}
                        className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90">
                        Proceed to Checkout
                    </button>

                    {/* Coupon */}
                    <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Have a coupon?</h4>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            />
                            <button className="border px-4 rounded-lg text-sm">
                                Apply
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* CONTINUE SHOPPING */}
            <div className="mt-10">
                <Link to="/">
                    <button className="text-sm text-gray-600 hover:underline">
                        ← Continue Shopping
                    </button>
                </Link>
            </div>
        </main>
    );
};

export default Cart;
