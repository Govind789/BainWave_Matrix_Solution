import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Navbar = ({ page }) => {
    const { isLoggedin, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLoginClick = () => {
        if (!isLoggedin) {
            navigate('/login');
        } else {
            logout(); 
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="bg-gray-900 w-screen h-16 flex items-center justify-between shadow-md px-4">
                <div className="text-xl font-bold text-white">
                    <Link to="/home" className="hover:text-red-500 transition-all">
                        Post Sphere
                    </Link>
                </div>

                <div className="hidden md:flex text-lg font-medium space-x-8 text-white">
                    <Link
                        to="/home"
                        className={`cursor-pointer transition-all hover:text-red-500 ${
                            page === 'HomePage' ? 'text-red-500' : ''
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/blogs"
                        className={`cursor-pointer transition-all hover:text-red-500 ${
                            page === 'BlogPage' ? 'text-red-500' : ''
                        }`}
                    >
                        Blogs
                    </Link>
                    <Link
                        to="/history"
                        className={`cursor-pointer transition-all hover:text-red-500 ${
                            page === 'HistoryPage' ? 'text-red-500' : ''
                        }`}
                    >
                        History
                    </Link>
                    <Link
                        to="/create"
                        className={`cursor-pointer transition-all hover:text-red-500 ${
                            page === 'Create' ? 'text-red-500' : ''
                        }`}
                    >
                        Create
                    </Link>
                    <Link
                        to="/login"
                        className={`cursor-pointer transition-all hover:text-red-500 ${
                            page === 'Login' ? 'text-red-500' : ''
                        }`}
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className={`cursor-pointer transition-all hover:text-red-500 ${
                            page === 'SignUp' ? 'text-red-500' : ''
                        }`}
                    >
                        SignUp
                    </Link>
                </div>

                <button
                    className="md:hidden text-white text-2xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    ☰
                </button>

                
                <div className="hidden md:flex items-center space-x-4">
                    <div
                        className={`h-2 p-4 text-black ${
                            isLoggedin ? 'bg-green-600' : 'bg-red-600'
                        } rounded-2xl`}
                    ></div>
                    <button
                        className="bg-white p-2 rounded-md hover:bg-red-500 transition-all"
                        onClick={handleLoginClick}
                    >
                        {isLoggedin ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white text-lg flex flex-col space-y-4 p-4">
                    <Link
                        to="/home"
                        className="hover:text-red-500 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/blogs"
                        className="hover:text-red-500 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Blogs
                    </Link>
                    <Link
                        to="/history"
                        className="hover:text-red-500 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        History
                    </Link>
                    <Link
                        to="/create"
                        className="hover:text-red-500 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Create
                    </Link>
                    <Link
                        to="/login"
                        className="hover:text-red-500 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="hover:text-red-500 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        SignUp
                    </Link>
                    <button
                        className="bg-white text-black p-2 rounded-md hover:bg-red-500 transition-all"
                        onClick={() => {
                            handleLoginClick();
                            setIsMenuOpen(false);
                        }}
                    >
                        {isLoggedin ? 'Logout' : 'Login'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
