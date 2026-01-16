import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { updatePassword } from "../../../API/Thunk/AuthThunk";

const PasswordModal = React.memo(({ onClose }) => {

    const [formData, setFormData] = useState({
        oldPass: "",
        newPass: "",
    });

    const [errors, setErrors] = useState({});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordLoader, setPasswordLoader] = useState(false);

    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth.authData);

    const toggleOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.oldPass.trim()) {
            newErrors.oldPass = "Old password is required";
        } else if (formData.oldPass !== authData.password) {
            newErrors.oldPass = "Old password is incorrect";
        }

        if (!formData.newPass.trim()) {
            newErrors.newPass = "New password is required";
        } else if (formData.newPass.length < 6) {
            newErrors.newPass = "Password must be at least 6 characters";
        } else if (formData.newPass === formData.oldPass) {
            newErrors.newPass = "New password must be different";
        }

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validateErrors = validateForm();
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            setPasswordLoader(true);

            dispatch(updatePassword({
                userId: authData.id,
                newPassword: formData.newPass,
            })).unwrap().then(() => {
                alert("Password Updated Successfully");

                setFormData({
                    oldPass: "",
                    newPass: "",
                })

                setErrors({});
                onClose();
            }).catch((error) => {
                alert(error);
            }).finally(() => {
                setPasswordLoader(false);
            })
        }

        console.log("Form Data:", formData);
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            {/* MODAL */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

                {/* HEADER */}
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Change Password
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Update your account password
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Old Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPass"
                            value={formData.oldPass}
                            placeholder="Enter old password"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.oldPass
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            onChange={changeHandler}
                        />
                        <div onClick={toggleOldPassword} className="show-password-block absolute top-[1.85rem] right-4">
                            <span className="capitalize tracking-wide cursor-pointer text-[0.9rem] font-[600]">
                                {showOldPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                        {errors.oldPass && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.oldPass}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            New Password
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPass"
                            value={formData.newPass}
                            placeholder="Enter new password"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.newPass
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            onChange={changeHandler}
                        />
                        <div onClick={toggleNewPassword} className="show-password-block absolute top-[1.85rem] right-4">
                            <span className="capitalize tracking-wide cursor-pointer text-[0.9rem] font-[600]">
                                {showNewPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                        {errors.newPass && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.newPass}
                            </p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:text-white hover:bg-black  transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={passwordLoader}
                            className="px-5 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-slate-50 hover:text-black border hover:border-gray-300 transition disabled::opacity-60"
                        >
                            {passwordLoader ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root"),
    );
});

export default PasswordModal;
