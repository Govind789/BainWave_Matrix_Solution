import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import UserContext from '../../context/UserContext';
import HistoryBlogCard from './HistoryBlogCard';

const HistoryPage = () => {
    const { userInfo } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/blogs');
                if (!res.ok) {
                    console.log('Failed to fetch blogs');
                    return;
                }
                const data = await res.json();
                setBlogs(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);
            if (data.status === 'success') {
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
            } else {
                console.error('Failed to delete blog:', data.message);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const userBlogs = blogs.filter((blog) => blog.user._id === userInfo.id);

    return (
        <div className="min-h-screen w-screen bg-slate-400 flex flex-col items-center">
            <Navbar page="HistoryPage" />
            <div className="p-8 w-full max-w-6xl">
                {userBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userBlogs.map((blog, index) => (
                            <HistoryBlogCard
                                key={index}
                                blog={blog}
                                image={blog.image}
                                onDelete={handleDeleteBlog}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-bold mb-4">You have not created any blogs yet</h2>
                        <p className="text-lg">Click the "Create Blog" button to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
