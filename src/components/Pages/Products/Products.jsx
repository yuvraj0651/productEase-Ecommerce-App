import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../API/Thunk/ApiThunk";
import Pagination from "../../UI/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { IoGitCompareSharp } from "react-icons/io5";
import { addCompareItem } from "../../API/Thunk/CompareThunk";
import { addToCompare } from "../../redux/Slice/CompareSlice";
import { addToCart } from "../../redux/Slice/CartSlice";

const Products = ({ filteredProducts }) => {

    const [selectedCategory, setSelectedCategory] = useState("popular");
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [draggedOverItemIndex, setDraggedOverItemIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productItems, setProductItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { fetchLoading, error } = useSelector((state) => state.productItems);

    const compareItems = useSelector((state) => state.compare.compareItems);
    console.log(compareItems);

    const authData = useSelector((state) => state.auth.authData);
    console.log("AuthData:", authData);

    const productsData = useSelector((state) => state.productItems.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setProductItems(productsData);
    }, [productsData]);

    const selectHandler = (e) => {
        setSelectedCategory(e.target.value);
    };

    useEffect(() => {
        console.log("Dragged Item:", draggedItemIndex, "Dragged Over:", draggedOverItemIndex);
    }, [draggedItemIndex, draggedOverItemIndex]);

    const sortedProducts = useMemo(() => {
        let updatedProducts = [...productItems];

        switch (selectedCategory) {
            case "low-to-high":
                return [...updatedProducts].sort((a, b) => a.price - b.price);

            case "high-to-low":
                return [...updatedProducts].sort((a, b) => b.price - a.price);

            case "newest":
                return [...updatedProducts].sort((a, b) => b.id - a.id);
            default:
                return updatedProducts;
        }
    }, [productItems, selectedCategory]);

    const products = sortedProducts;

    const itemsPerPage = 6;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    useEffect(() => {
        if (filteredProducts && filteredProducts.length >= 0) {
            setProductItems(filteredProducts);
        }
    }, [filteredProducts]);

    const addProductHandler = useCallback((product) => {

        if (!authData) {
            navigate("/account");
            return;
        }

        dispatch(addToCart(product));
    }, [authData, dispatch, navigate]);

    const addCompareHandler = useCallback((product) => {
        dispatch(addToCompare(product));
    }, [dispatch]);

    const AddCompareDataApi = useCallback((product) => {
        dispatch(addCompareItem(product));
    }, [dispatch]);

    // Dragged Item Start
    const draggedItemStart = (id) => {
        console.log("Dragged Item Index:", id);
        setDraggedItemIndex(id);
    };

    // Dragged Over Item
    const draggedOverEnter = (id) => {
        console.log("Dragged Over Item Index:", id);
        setDraggedOverItemIndex(id);
    };

    const draggedItemEnd = () => {
        if (draggedItemIndex === null || draggedOverItemIndex === null) return;
        const items = [...productItems];

        const fromIndex = items.findIndex((item) => item.id === draggedItemIndex);
        const toIndex = items.findIndex((item) => item.id === draggedOverItemIndex);
        console.log("From Index:", fromIndex, "To Index:", toIndex);

        if (fromIndex === -1 || toIndex === -1) return;

        const [movedItem] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, movedItem);

        setProductItems(items);
        setDraggedItemIndex(null);
        setDraggedOverItemIndex(null);
    };

    if (fetchLoading) {
        return (
            <p className="text-center my-[1rem] tracking-wide font-[600] text-slate-800">Loading Products...</p>
        )
    };

    if (error) {
        return (
            <p className="text-center my-[1rem] tracking-wide font-[600] text-slate-800">{error}</p>
        )
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">

            {/* TOP BAR */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold">
                    Products <span className="text-gray-500">({products.length} items)</span>
                </h1>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Sort by</span>
                    <select
                        value={selectedCategory}
                        onChange={selectHandler}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none">
                        <option value="popular">Popular</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* SIDEBAR FILTERS (Desktop Only) */}
                <aside className="hidden md:block border rounded-xl p-6 h-fit">
                    <h3 className="font-semibold mb-4">Filters</h3>

                    {/* Category */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">Category</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Electronics</li>
                            <li>Fashion</li>
                            <li>Home</li>
                            <li>Beauty</li>
                        </ul>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">Price</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Under ₹1000</li>
                            <li>₹1000 - ₹5000</li>
                            <li>₹5000 - ₹10000</li>
                            <li>Above ₹10000</li>
                        </ul>
                    </div>

                    {/* Brand */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Brand</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Apple</li>
                            <li>Samsung</li>
                            <li>Nike</li>
                            <li>Adidas</li>
                        </ul>
                    </div>
                </aside>

                {/* PRODUCTS GRID */}
                <section className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">

                        {/* PRODUCT CARD */}
                        {paginatedProducts.map(item => {
                            const isAdded = compareItems.some((compareItem) => compareItem.id === item.id);
                            return (
                                <div
                                    key={item.id}
                                    draggable
                                    onDragStart={() => draggedItemStart(item.id)}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        draggedOverEnter(item.id);
                                    }}
                                    onDragEnd={draggedItemEnd}
                                    className="border rounded-2xl overflow-hidden hover:shadow-lg transition bg-white relative"
                                >
                                    <div className="product-compare-badge absolute top-[2rem] left-0" onClick={() => {
                                        if (isAdded) return;
                                        addCompareHandler(item)
                                        AddCompareDataApi(item)
                                    }}>
                                        <div className={`compare-badge border border-[#ccc] shadow-sm shadow-[#ccc] p-2 rounded-tr-[7px] rounded-br-[7px] hover:bg-slate-50 hover:text-black transition duration-300 ${isAdded ? "bg-green-600 text-white cursor-not-allowed hover:bg-green-600 hover:text-white" : "bg-black text-white cursor-pointer"}`}>
                                            <IoGitCompareSharp />
                                        </div>
                                    </div>
                                    {/* Image */}
                                    <div className="bg-gray-100 flex items-center justify-center text-5xl">
                                        <div className="product-picture">
                                            <img loading="lazy" src={item.image} alt={item.title} className="w-full h-auto object-cover" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-5">
                                            {item.description}
                                        </p>
                                        <div className="product-view-detail mt-[0.5rem]">
                                            <Link to={`/products/${item.id}`}>
                                                <span className="capitalize tracking-wide font-[500] hover:underline">View Detail</span>
                                            </Link>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="font-bold text-lg">
                                                ₹{item.price}
                                            </span>
                                            <button
                                                onClick={() => addProductHandler(item)}
                                                className="bg-black text-white text-sm px-4 py-2 rounded-lg">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageNumbers={pageNumbers}
                        totalPages={totalPages}
                    />
                </section>

            </div>
        </main>
    );
};

export default Products;
