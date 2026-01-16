import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../API/Thunk/AuthThunk";
import { CgProfile } from "react-icons/cg";

const Header = ({ searchTerm, setSearchTerm }) => {
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.products.cartItems);
    let totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const authData = useSelector((state) => state.auth.authData);

    const searchHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    const logoutHandler = () => {
        setLoggingOut(true);
        dispatch(logout());

        setTimeout(() => {
            setLoggingOut(false);
            navigate("/");
        }, 1200);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4">

                {/* TOP BAR */}
                <div className="flex items-center justify-between py-4">

                    {/* LOGO */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xl">
                            S
                        </div>
                        <span className="text-xl font-bold tracking-wide">
                            <Link to="/">
                                Shop<span className="text-gray-500">Ease</span>
                            </Link>
                        </span>
                    </div>

                    {/* SEARCH (Desktop) */}
                    <div className="hidden md:flex flex-1 mx-10">
                        <input
                            type="text"
                            placeholder="Search for products, brands & more"
                            className="w-full border border-r-0 rounded-l-lg px-4 py-2 focus:outline-none"
                            value={searchTerm}
                            onChange={searchHandler}
                        />
                        <button className="bg-black text-white px-6 rounded-r-lg">
                            Search
                        </button>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4 text-sm font-medium pr-2">

                        {/* Desktop buttons */}
                        <Link to="/account" className="hidden md:block text-gray-600 hover:text-black">
                            Account
                        </Link>
                        <Link to="/wishlist" className="hidden md:block text-gray-600 hover:text-black">
                            Wishlist
                        </Link>
                        <div className="relative group">
                            <div className="profile profile-block flex justify-center hover:cursor-pointer">
                                <CgProfile className="text-[1.3rem]" />
                            </div>
                            <div className="profile-dropdown absolute top-[1.8rem] left-[-4rem] hidden group-hover:block">
                                <div class="absolute top-[-0.45rem] left-[47%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black border-t-0"> </div>
                                <ul className="border border-[#ccc] shadow-sm shadow-[#ccc] text-center py-[0.3rem] px-[0.3rem] w-[9rem] bg-white">
                                    <Link to="/profile">
                                        <li className="block cursor-pointer hover:bg-black py-[0.3rem] hover:text-slate-50 capitalize tracking-wide font-[500] text-[0.9rem] border-b border-[#ccc]">Profile</li>
                                    </Link>
                                    <Link to="/all-users">
                                        <li className="block mt-1 cursor-pointer hover:bg-black py-[0.3rem] hover:text-slate-50 capitalize tracking-wide font-[500] text-[0.9rem]">Admin</li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                        {/* CART ICON */}
                        <Link to="/cart">
                            <button className="relative align-middle mt-1 text-gray-700 hover:text-black">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.836L5.82 8.25m0 0h12.63c.958 0 1.664.887 1.44 1.82l-1.5 6A1.5 1.5 0 0 1 16.93 17.25H7.07a1.5 1.5 0 0 1-1.46-1.18L4.5 4.5m1.32 3.75L7.5 14.25m9.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>

                                {/* CART COUNT */}
                                {
                                    cartItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </button>
                        </Link>

                        {/* HAMBURGER (Mobile) */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden text-2xl"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* CATEGORY NAV (Desktop) */}
                <div className="flex items-center justify-between">
                    <nav className="hidden md:flex gap-8 py-3 text-sm font-medium text-gray-600">
                        <a href="#" className="hover:text-black">Men</a>
                        <a href="#" className="hover:text-black">Women</a>
                        <a href="#" className="hover:text-black">Electronics</a>
                        <a href="#" className="hover:text-black">Home</a>
                        <a href="#" className="hover:text-black">Beauty</a>
                        <Link to="/compare" className="font-semibold text-black">Compare</Link>
                    </nav>
                    {authData && (
                        <div className="logout-account-button">
                            <button
                                type="button"
                                onClick={logoutHandler}
                                disabled={loggingOut}
                                className={`uppercase tracking-wide font-[600] border border-[#ccc] shadow-sm py-1 px-4 rounded-[5px] text-[0.8rem] transition duration-300 ${loggingOut ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-slate-200 hover:text-black"} `}>
                                logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden border-t bg-white">
                    <div className="px-4 py-4 space-y-4 text-sm font-medium text-gray-700">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                        />

                        <a href="#" className="block">Men</a>
                        <a href="#" className="block">Women</a>
                        <a href="#" className="block">Electronics</a>
                        <a href="#" className="block">Home</a>
                        <a href="#" className="block">Beauty</a>
                        <a href="#" className="block font-semibold">Sale</a>

                        <hr />

                        <a href="#" className="block">Account</a>
                        <Link to="/wishlist" className="block">Wishlist</Link>
                    </div>
                </div>
            )}
            {
                loggingOut && (
                    <div className="fixed inset-0 z-[999] bg-white/80 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-700 font-medium tracking-wide">
                            Logging you out...
                        </p>
                    </div>
                )
            }
        </header>
    );
};

export default Header;
