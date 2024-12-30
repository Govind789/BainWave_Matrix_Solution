import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Navbar = ({ page }) => {
    const { isLoggedin, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (!isLoggedin) {
            navigate('/login');
        } else {
            logout(); 
        }
    };

    return (
        <div>
            <div className="bg-gray-900 w-screen h-16 flex items-center justify-between shadow-md px-4">
                <div className="flex text-lg font-medium space-x-8 text-white">
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

                <div className="flex items-center space-x-4">
                    <div
                        className={`h-2 p-4 ${isLoggedin?'bg-green-600':'bg-red-600'} rounded-2xl mr-5`}
                    ></div>
                    <button
                        className={`bg-white p-2 rounded-md hover:bg-red-500 transition-all mr-10`}
                        onClick={handleLoginClick}
                    >
                        {isLoggedin ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
