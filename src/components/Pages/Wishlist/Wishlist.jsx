import { useDispatch, useSelector } from "react-redux";
import { clearWishlist, removeFromWishlist } from "../../redux/Slice/WishlistSlice";
import { Link } from "react-router";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { addToCart } from "../../redux/Slice/CartSlice";

const Wishlist = () => {

    const dispatch = useDispatch();

    const wishlistItem = useSelector((state) => state.wishlist.wishlistItems);

    const removeWishlistHandler = (id) => {
        dispatch(removeFromWishlist({ id }));
    };

    const addProductHandler = (product) => {
        dispatch(addToCart(product));
    };

    const clearWishlistHandler = () => {
        dispatch(clearWishlist());
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <Breadcrumb />

            {/* PAGE TITLE */}
            <div className="flex items-center justify-between">
                <div className="mb-8 mt-[2rem]">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                    <p className="text-gray-500 mt-1">
                        Items you’ve saved for later
                    </p>
                </div>
                {wishlistItem.length > 0 && (
                    <div className="clear-wishlist-block pr-[2rem]">
                        <button
                            onClick={clearWishlistHandler}
                            className="border border-[#ccc] shadow-sm shadow-[#ccc] py-2 px-7 uppercase rounded-[5px] tracking-wide font-[600] bg-black text-white text-[0.8rem] transition duration-300 hover:bg-slate-50 hover:text-black hover:border-gray-400">clear wishlist</button>
                    </div>
                )}
            </div>

            {/* WISHLIST GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* WISHLIST CARD */}
                {
                    wishlistItem.length === 0 ? (
                        <div className="col-span-full flex justify-center items-center h-40">
                            <p className="text-gray-500 font-[500] text-[0.9rem]">
                                No Wishlist Item To Show
                            </p>
                        </div>
                    ) : (
                        wishlistItem.map((item) => (
                            <div
                                key={item}
                                className="border rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
                            >
                                {/* IMAGE */}
                                <div className="h-56 bg-gray-100 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt="Product"
                                        className="w-36 object-contain"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg line-clamp-2">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* PRICE */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="font-bold text-lg">₹{item.price}</span>
                                        <span className="text-sm text-gray-400 line-through">
                                            ₹1,200
                                        </span>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <button
                                            onClick={() => addProductHandler(item)}
                                            className="flex-1 bg-black text-white text-sm py-2 rounded-lg hover:opacity-90">
                                            Add to Cart
                                        </button>

                                        <button
                                            onClick={() => removeWishlistHandler(item.id)}
                                            className="border rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </div>

            {/* CONTINUE SHOPPING */}
            <div className="mt-12 text-center">
                <Link to="/products">
                    <button className="text-sm text-gray-600 hover:underline">
                        ← Continue Shopping
                    </button>
                </Link>
            </div>

        </main>
    );
};

export default Wishlist;
