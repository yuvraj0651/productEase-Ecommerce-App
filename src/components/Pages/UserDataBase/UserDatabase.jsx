import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, updateUserStatus } from "../../API/Thunk/UsersThunk";
import UpdateModal from "../../UI/Modal/UpdateModal/UpdateModal";

const UserDatabase = () => {

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [adminPassword, setAdminPassword] = useState({});
    const [passwordError, setPasswordError] = useState({});

    const itemsPerPage = 6;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    const { users: user, isLoading, error } = useSelector((state) => state.usersData);
    console.log(user);

    const toggleUpdateModal = useCallback(() => {
        setIsUpdateModalOpen(prev => !prev);
    }, []);

    const usersWithStatus = useMemo(() => {
        return user.map((u) => ({
            ...u,
            status: u.status || "active"
        }));
    }, [user]);

    // const safeUsers = usersWithStatus;

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return usersWithStatus;
        return usersWithStatus.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [usersWithStatus, searchTerm]);

    const totalUsers = useMemo(() => {
        const lastItemIndex = currentPage * itemsPerPage;
        const firstItemIndex = lastItemIndex - itemsPerPage;
        return filteredUsers.slice(firstItemIndex, lastItemIndex);
    }, [filteredUsers, currentPage, itemsPerPage]);

    const totalPages = useMemo(() => Math.ceil(filteredUsers.length / itemsPerPage), [filteredUsers]);

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }, [totalPages]);

    const searchHandler = useCallback((e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }, []);

    const statusHandler = useCallback((id, value) => {
        dispatch(updateUserStatus({
            userId: id,
            updatedStatus: value
        }));
    }, [dispatch]);

    const removeUserHandler = useCallback((id) => {
        dispatch(deleteUser(id));
    }, [dispatch]);

    const loggedInUser = useSelector((state) => state.auth.authData);

    const confirmAdminPassword = useCallback((actionType, user) => {
        if (!loggedInUser) return;

        const userPasswordInput = adminPassword[user.id] || "";

        if (userPasswordInput === loggedInUser.password) {
            setPasswordError((prev) => ({ ...prev, [user.id]: "" }));
            if (actionType === "edit") {
                setSelectedUser(user);
                setIsUpdateModalOpen(true);
            } else if (actionType === "delete") {
                removeUserHandler(user.id);
            }
        } else {
            setPasswordError((prev) => ({ ...prev, [user.id]: "Incorrect password! Action not allowed." }));
        }

        setAdminPassword((prev) => ({ ...prev, [user.id]: "" }));
    }, [adminPassword, loggedInUser, removeUserHandler])

    if (isLoading) {
        return (
            <p>user data is loading...</p>
        )
    };

    if (error) {
        return (
            <p>Something went wrong</p>
        )
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                    User Admin
                </h1>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search users..."
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full sm:w-64"
                        onChange={searchHandler}
                    />
                    <button
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setCurrentPage(1)
                            }
                        }}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-50 border hover:border-gray-300 hover:text-black transition duration-300">
                        Search User
                    </button>
                </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    All
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Admin
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    User
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Active
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Inactive
                </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Head */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            totalUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No User Data Found
                                    </td>
                                </tr>
                            ) : (
                                totalUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <span
                                                className={`px-3 py-1 rounded-[5px] capitalize text-xs font-semibold ${user.role === "Admin"
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {user.role || "Admin"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span
                                                className={`px-3 py-2 rounded-[5px] text-xs font-semibold capitalize`}
                                            >
                                                <select
                                                    className="py-2 px-3"
                                                    value={user.status}
                                                    onChange={(e) => statusHandler(user.id, e.target.value)}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex gap-2 mb-1">
                                                <input
                                                    type="password"
                                                    value={adminPassword[user.id] || ""}
                                                    onChange={(e) => setAdminPassword((prev) => ({
                                                        ...prev, [user.id]: e.target.value
                                                    }))}
                                                    placeholder="Enter your password"
                                                    className="px-2 py-1 border rounded"
                                                />
                                                <button
                                                    onClick={() => {
                                                        confirmAdminPassword("edit", user);
                                                    }}
                                                    className="text-indigo-600 hover:text-indigo-900 transition">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        confirmAdminPassword("delete", user);
                                                    }}
                                                    className="text-red-600 hover:text-red-900 transition">
                                                    Delete
                                                </button>
                                            </div>
                                            {passwordError[user.id] && (
                                                <p className="text-red-500 text-xs block">{passwordError[user.id]}</p>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-end items-center mt-4 gap-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Previous
                </button>
                {pageNumbers.map((page) => (
                    <div key={page}>
                        <span className="px-3 py-1 bg-white border rounded-lg">
                            {page}
                        </span>
                    </div>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    Next
                </button>
            </div>
            {
                isUpdateModalOpen && (
                    <div onClick={toggleUpdateModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <UpdateModal onClose={toggleUpdateModal} user={selectedUser} />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UserDatabase;
