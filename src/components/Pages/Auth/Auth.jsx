import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../API/Thunk/AuthThunk";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [loginSelect, setLoginSelect] = useState("select-user-role");
    const [loginErrors, setLoginErrors] = useState({});
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const [loggingIn, setLoggingIn] = useState(false);

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [registerSelect, setRegisterSelect] = useState("select-user-role");
    const [registerErrors, setRegisterErrors] = useState({});

    const loginEmailRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const registerNameRef = useRef(null);
    const registerEmailRef = useRef(null);
    const registerPasswordRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        loginEmailRef.current?.focus();
    }, []);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const loginSelectHandler = (e) => {
        const { value } = e.target;
        setLoginSelect(value);
    };

    const registerSelectHandler = (e) => {
        const { value } = e.target;
        setRegisterSelect(value);
    };

    const toggleLoginPassword = () => {
        setShowLoginPassword(prev => !prev);
    };

    const toggleRegisterPassword = () => {
        setShowRegisterPassword(prev => !prev);
    };

    const validateLogin = () => {
        let errors = {};

        if (!loginData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            errors.email = "Invalid email format";
        }

        if (!loginData.password) {
            errors.password = "Password is required";
        } else if (loginData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (loginSelect === "select-user-role") {
            alert("Please select user role");
            return;
        }

        setLoginErrors(errors);

        if (errors.email) loginEmailRef.current.focus();
        else if (errors.password) loginPasswordRef.current.focus();

        return Object.keys(errors).length === 0;
    };

    const validateRegister = () => {
        let errors = {};

        if (!registerData.name) {
            errors.name = "Full name is required";
        }

        if (!registerData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            errors.email = "Invalid email format";
        }

        if (!registerData.password) {
            errors.password = "Password is required";
        } else if (registerData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (registerSelect === "select-user-role") {
            alert("Please select user role");
            return;
        }

        setRegisterErrors(errors);

        if (errors.name) registerNameRef.current.focus();
        else if (errors.email) registerEmailRef.current.focus();
        else if (errors.password) registerPasswordRef.current.focus();

        return Object.keys(errors).length === 0;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const isValid = validateLogin();
        if (!isValid) return;

        setLoggingIn(true);

        dispatch(loginUser({ ...loginData, role: loginSelect }))
            .unwrap()
            .then(() => {
                alert("Successfully Logged In");
                setLoggingIn(false)

                setLoginData({
                    email: "",
                    password: "",
                });

                setLoginErrors({});

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                alert(error);

                setLoginData({
                    email: "",
                    password: "",
                });
            });

        console.log("Login Data", loginData);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const isValid = validateRegister();
        if (!isValid) return;

        dispatch(registerUser({ ...registerData, role: registerSelect }))
            .unwrap()
            .then(() => {
                alert("Successfully Registered");

                setRegisterData({
                    name: "",
                    email: "",
                    password: "",
                });

                setRegisterErrors({});
            })
            .catch((error) => {
                alert(error);
            });

        console.log("Register Data", registerData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
            <div className="w-full h-[30rem] max-w-5xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

                <div className="p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-500 mb-8">Login to your account</p>

                    <form className="space-y-5" onSubmit={handleLoginSubmit}>
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                ref={loginEmailRef}
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            />
                            {loginErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label className="text-sm text-gray-600">Password</label>
                            <input
                                ref={loginPasswordRef}
                                type={showLoginPassword ? "text" : "password"}
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            />
                            <span onClick={toggleLoginPassword} className="absolute top-[2.3rem] right-3 cursor-pointer text-indigo-700 tracking-wide font-[600] text-[0.9rem]">
                                {showLoginPassword ? "Hide" : "Show"}
                            </span>
                            {loginErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="user-role" className="text-sm text-gray-600 block">User Role</label>
                            <select
                                name="user"
                                id="user-role"
                                className="mt-1 py-[0.4rem] px-4 text-sm"
                                value={loginSelect}
                                onChange={loginSelectHandler}
                            >
                                <option value="select-user-role" hidden className="text-sm">Select User Role</option>
                                <option value="user" className="text-sm bg-white cursor-pointer">User</option>
                                <option value="admin" className="text-sm bg-white cursor-pointer">Admin</option>
                            </select>
                        </div>

                        <button
                            disabled={loggingIn}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-60">
                            {loggingIn ? "Logging In..." : "Login"}
                        </button>
                    </form>
                </div>

                <div className="p-10 bg-gray-50 overflow-y-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-500 mb-8">Register a new account</p>

                    <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                ref={registerNameRef}
                                type="text"
                                name="name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                            />
                            {registerErrors.name && (
                                <p className="text-red-500 text-sm mt-1">{registerErrors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                ref={registerEmailRef}
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                            />
                            {registerErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{registerErrors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label className="text-sm text-gray-600">Password</label>
                            <input
                                ref={registerPasswordRef}
                                type={showRegisterPassword ? "text" : "password"}
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
                            />
                            <span onClick={toggleRegisterPassword} className="absolute top-[2.4rem] right-3 cursor-pointer text-indigo-700 tracking-wide font-[600] text-[0.9rem]">
                                {showRegisterPassword ? "Hide" : "Show"}
                            </span>
                            {registerErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{registerErrors.password}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="user-role" className="text-sm text-gray-600 block">User Role</label>
                            <select
                                name="user"
                                id="user-role"
                                className="mt-1 py-[0.4rem] px-4 text-sm"
                                value={registerSelect}
                                onChange={registerSelectHandler}
                            >
                                <option value="select-user-role" hidden className="text-sm">Select User Role</option>
                                <option value="user" className="text-sm bg-white cursor-pointer">User</option>
                                <option value="admin" className="text-sm bg-white cursor-pointer">Admin</option>
                            </select>
                        </div>

                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">
                            Register
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Auth;
