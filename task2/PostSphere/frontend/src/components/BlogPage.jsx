import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BlogCard from './BlogCard';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [image, setImage] = useState([]); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('https://postsphere-ten.vercel.app/api/blogs');
                if (!res.ok) {
                    console.log('Failed to fetch blogs');
                    return;
                }
                const data = await res.json();
                // console.log(data);
                setBlogs(data.data);

                // setImage(await imagePath.replace(/\\/g, "/")); 
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen w-screen bg-slate-400 flex flex-col items-center">
            <Navbar page="BlogPage" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 w-full max-w-6xl">
                {blogs.map((blog,index) => (
                    <BlogCard key={index} blog={blog} image={blog.image}/>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
