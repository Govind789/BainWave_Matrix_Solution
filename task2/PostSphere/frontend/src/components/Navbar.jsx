import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Navbar = ({page}) => {

    const {isLoggedin,logout}= useContext(UserContext);

    return (
        <div>
            <div className="bg-gray-900 w-screen h-16 flex items-center shadow-md ">
                <div className='flex text-lg font-medium space-x-8 mx-auto text-white'>
                    <Link to="/home" className={`cursor-pointer transition-all hover:text-red-500 ${
                        page === 'HomePage' ? 'text-red-500' : ''
                    }`}>Home</Link>
                    <Link to="/blogs" className={`cursor-pointer transition-all hover:text-red-500 ${
                        page === 'Blogs' ? 'text-red-500' : ''
                    }`}>Blogs</Link>
                    <Link to="/history" className={`cursor-pointer transition-all hover:text-red-500 ${
                        page === 'History' ? 'text-red-500' : ''
                    }`}>History</Link>
                    <Link to="/create" className={`cursor-pointer transition-all hover:text-red-500 ${
                        page === 'Create' ? 'text-red-500' : ''
                    }`}>Create</Link>
                    <Link to="/login" className={`cursor-pointer transition-all hover:text-red-500 ${
                        page === 'Login' ? 'text-red-500' : ''
                    }`}>Login</Link>
                    <Link to="/signup" className={`cursor-pointer transition-all hover:text-red-500 ${
                        page === 'SignUp' ? 'text-red-500' : ''
                    }`}>SignUp</Link>
                </div>
                {isLoggedin && <button className='bg-white p-2 rounded-md mr-2 hover:bg-red-500 transition-all delay-75' onClick={logout}>Logout</button> }
                <div className={`h-2 p-4 ${isLoggedin?'bg-green-600':'bg-red-600'} rounded-2xl mr-5`}> </div>
            </div>
        </div>
    );
}

export default Navbar;
