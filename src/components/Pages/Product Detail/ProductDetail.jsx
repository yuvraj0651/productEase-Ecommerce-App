import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { addToCart } from "../../redux/Slice/CartSlice";

const ProductDetail = () => {

    const { id } = useParams();
    console.log(id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items: productData } = useSelector((state) => state.productItems);

    let product = productData.find((item) => item.id === Number(id));
    console.log(product);

    const AddProductHandler = (product) => {
        dispatch(addToCart(product));
    };

    const buyProduct = (product) => {
        dispatch(addToCart(product));

        setTimeout(() => {
            navigate("/checkout");
        }, 700);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <Breadcrumb />
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                Home / Electronics / Headphones
            </div>

            {/* MAIN SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT: Images */}
                <div className="flex gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-20 flex items-center justify-center h-20 border rounded-lg bg-gray-100 cursor-pointer hover:border-black"
                            >
                                <img src={product.image} alt={product.title} className="w-[3rem]" />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 border rounded-2xl bg-gray-100 h-[450px]" >
                        <div className="main-picture flex items-center h-full justify-center">
                            <img src={product.image} alt={product.title} className="w-[18rem]" />
                        </div>
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-3">
                        {product.title}
                    </h1>

                    <p className="text-gray-500 mb-4">
                        {product.description}.
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-yellow-400">
                            ★★★★☆
                        </div>
                        <span className="text-sm text-gray-500">(124 reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <span className="text-3xl font-bold">₹{product.price}</span>
                        <span className="text-gray-400 line-through ml-3">₹1,200</span>
                        <span className="text-green-600 ml-3 font-medium">29% off</span>
                    </div>

                    {/* Availability */}
                    <p className="text-green-600 font-medium mb-6">
                        In Stock
                    </p>

                    {/* Color Options */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Color</h4>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-black border cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-gray-400 border cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-blue-600 border cursor-pointer" />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Quantity</h4>
                        <div className="flex items-center border rounded-lg w-max">
                            <button className="px-4 py-2">-</button>
                            <span className="px-6">1</span>
                            <button className="px-4 py-2">+</button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => AddProductHandler(product)}
                            className="flex-1 bg-black text-white py-3 rounded-xl hover:opacity-90">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => buyProduct(product)}
                            className="flex-1 border py-3 rounded-xl hover:bg-gray-100">
                            Buy Now
                        </button>
                    </div>

                    {/* Delivery Info */}
                    <div className="border rounded-xl p-4 text-sm text-gray-600 space-y-2">
                        <p>🚚 Free Delivery within 3-5 days</p>
                        <p>🔁 7 Days Replacement</p>
                        <p>🛡️ 1 Year Warranty</p>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-600 leading-relaxed">
                    {product.description}.
                </p>
            </div>

            {/* SPECIFICATIONS */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-2 text-gray-600">
                        <li><strong>Brand:</strong> AudioPro</li>
                        <li><strong>Model:</strong> X200</li>
                        <li><strong>Battery Life:</strong> 30 Hours</li>
                        <li><strong>Connectivity:</strong> Bluetooth 5.2</li>
                    </ul>
                    <ul className="space-y-2 text-gray-600">
                        <li><strong>Noise Cancellation:</strong> Yes</li>
                        <li><strong>Weight:</strong> 250g</li>
                        <li><strong>Warranty:</strong> 1 Year</li>
                        <li><strong>Country:</strong> India</li>
                    </ul>
                </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

                {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b py-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">User Name</span>
                            <span className="text-yellow-400">★★★★☆</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Great sound quality and very comfortable to wear. Totally worth
                            the price!
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProductDetail;
