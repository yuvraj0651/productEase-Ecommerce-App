import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../API/Thunk/AuthThunk";

const UpdateModal = React.memo(({ onClose, user }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [updateLoader, setUpdateLoader] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        setUpdateLoader(true);
        dispatch(updateUserProfile({ ...formData, userId: user.id })).unwrap().then(() => {
            alert("User Data Updated Successfully");

            setFormData({
                ...formData,
                password: "",
            });

        }).catch((error) => {
            alert(error);
        }).finally(() => {
            setUpdateLoader(false);
        })
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-gray-800">
                        Update Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* FORM */}
                <form className="space-y-4" onSubmit={submitHandler}>

                    {/* NAME */}
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[2.1rem] cursor-pointer text-sm font-semibold text-black"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateLoader}
                            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-slate-50 border hover:border-gray-300 hover:text-black transition duration-300 disabled:opacity-60"
                        >
                            {updateLoader ? "Updating Data...." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root"),
    );
});

export default UpdateModal;
