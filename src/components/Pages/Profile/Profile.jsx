import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../API/Thunk/AuthThunk";
import { useState } from "react";
import PasswordModal from "../../UI/Modal/PasswordModal/PasswordModal";
import UpdateModal from "../../UI/Modal/UpdateModal/UpdateModal";

const Profile = () => {

    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [editingId, setEditingId] = useState("");

    const dispatch = useDispatch();

    const { authData } = useSelector((state) => state.auth);
    console.log(authData);

    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const totalWishlistItems = wishlistItems.length;

    const compareItems = useSelector(state => state.compare.compareItems);
    const totalCompareItems = compareItems.length;

    const togglePasswordModal = () => {
        setIsPasswordOpen(!isPasswordOpen);
    };

    const toggleUpdateModal = () => {
        setIsUpdateOpen(!isUpdateOpen);
    };

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-12">
            {/* COVER */}
            <div className="relative">
                <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

                {/* PROFILE CARD */}
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-md -mt-16 p-6 flex flex-col md:flex-row items-center gap-6">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-sm object-cover"
                        />

                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {authData.name}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Frontend Developer • React.js
                            </p>

                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600">
                                    React
                                </span>
                                <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-600">
                                    Tailwind
                                </span>
                                <span className="px-3 py-1 text-xs rounded-full bg-pink-50 text-pink-600">
                                    Redux
                                </span>
                            </div>
                        </div>

                        <button
                            className="px-5 py-2 text-sm rounded-lg bg-black text-white hover:bg-slate-50 border hover:text-black hover:border-gray-300  transition duration-300">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT INFO */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                        Profile Overview
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        Passionate frontend developer focused on building
                        scalable, responsive and user-friendly web applications
                        using modern React ecosystem.
                    </p>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium text-gray-800">
                                {authData.email}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Location</span>
                            <span className="font-medium text-gray-800">
                                India
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Member Since</span>
                            <span className="font-medium text-gray-800">
                                Jan 2024
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT STATS */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-6">
                        Account Statistics
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border rounded-xl p-4 text-center hover:shadow-sm transition">
                            <p className="text-2xl font-bold text-indigo-600">
                                24
                            </p>
                            <p className="text-sm text-gray-500">Orders</p>
                        </div>

                        <div className="border rounded-xl p-4 text-center hover:shadow-sm transition">
                            <p className="text-2xl font-bold text-purple-600">
                                {totalWishlistItems}
                            </p>
                            <p className="text-sm text-gray-500">Wishlist</p>
                        </div>

                        <div className="border rounded-xl p-4 text-center hover:shadow-sm transition">
                            <p className="text-2xl font-bold text-pink-600">
                                {totalCompareItems}
                            </p>
                            <p className="text-sm text-gray-500">Compare</p>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            onClick={toggleUpdateModal}
                            className="px-6 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-slate-50 hover:text-black border hover:border-gray-300 transition duration-300">
                            Update Profile
                        </button>
                        <button
                            onClick={togglePasswordModal}
                            className="px-6 py-2 rounded-lg text-sm font-medium border hover:bg-gray-50 transition">
                            Change Password
                        </button>
                        <button
                            onClick={logoutHandler}
                            className="px-6 py-2 rounded-lg text-sm font-medium border text-red-600 hover:bg-red-50 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {isPasswordOpen && (
                <div onClick={togglePasswordModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <PasswordModal onClose={togglePasswordModal} />
                    </div>
                </div>
            )}
            {
                isUpdateOpen && (
                    <div onClick={toggleUpdateModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <UpdateModal
                                editingId={editingId}
                                setEditingId={setEditingId}
                                user={authData}
                                onClose={toggleUpdateModal} />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Profile;
