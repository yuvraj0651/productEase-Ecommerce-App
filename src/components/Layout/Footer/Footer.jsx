// components/Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-black text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xl">
                                S
                            </div>
                            <span className="text-xl font-bold text-white tracking-wide">
                                Shop<span className="text-gray-400">Ease</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            ShopEase is your one-stop destination for premium products,
                            curated for modern lifestyles.
                        </p>
                    </div>

                    {/* SHOP */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">Men</li>
                            <li className="hover:text-white cursor-pointer">Women</li>
                            <li className="hover:text-white cursor-pointer">Electronics</li>
                            <li className="hover:text-white cursor-pointer">Beauty</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">About Us</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                            <li className="hover:text-white cursor-pointer">Press</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                        <p className="text-sm mb-4">
                            Subscribe to get special offers and updates.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-l-lg text-black focus:outline-none"
                            />
                            <button className="bg-white text-black px-4 rounded-r-lg font-medium">
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

                    <p>
                        © {new Date().getFullYear()} ShopEase. All rights reserved.
                    </p>

                    {/* SOCIAL ICONS */}
                    <div className="flex gap-4">
                        <span className="hover:text-white cursor-pointer">
                            🌐
                        </span>
                        <span className="hover:text-white cursor-pointer">
                            📸
                        </span>
                        <span className="hover:text-white cursor-pointer">
                            🐦
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
