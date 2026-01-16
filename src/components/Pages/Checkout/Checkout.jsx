import { useState } from "react";
import { useDispatch } from "react-redux";
import { addingCheckout } from "../../API/Thunk/CheckoutThunk";
import { useNavigate } from "react-router";

const Checkout = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (formData.phone.length < 10) {
            newErrors.phone = "Phone must be at least 10 digits";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.zip.trim()) {
            newErrors.zip = "ZIP code is required";
        }

        return newErrors;
    };

const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    const orderId = `ORD-${Date.now()}`;

    if (Object.keys(validationErrors).length === 0) {

        dispatch(addingCheckout({ ...formData, orderId }))
            .then(() => {
                alert("Checkout Data Saved Successfully");

                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    zip: "",
                });

                setErrors({});

                navigate(`/thankyou/${orderId}`);
            })
            .catch((error) => {
                alert("Something went wrong");
                console.log(error);
            });
    }
};

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

                {/* HEADER */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Checkout
                </h2>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* FULL NAME */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.fullName ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"}
                            `}
                        />
                        {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"}
                            `}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"}
                            `}
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                        )}
                    </div>

                    {/* CITY */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Delhi"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.city ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"}
                            `}
                        />
                        {errors.city && (
                            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                        )}
                    </div>

                    {/* ADDRESS */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Street, House No, Area"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.address ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"}
                            `}
                        />
                        {errors.address && (
                            <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/* ZIP */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            ZIP Code
                        </label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            placeholder="110001"
                            className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2
                                ${errors.zip ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"}
                            `}
                        />
                        {errors.zip && (
                            <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-black text-white font-medium hover:bg-white hover:text-black border border-[#ccc] shadow-sm shadow-[#ccc] transition duration-300"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
