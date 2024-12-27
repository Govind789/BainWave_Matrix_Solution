import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import UserContext from '../../context/UserContext';
import BlogCard from './BlogCard';

const BlogPage = () => {

    const {blogs} = useContext(UserContext);
    return (
        <div className='h-screen w-screen bg-slate-400'>
            <Navbar page='BlogPage'/>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 pb-12'>
                {
                    blogs.map((blog,index)=>(
                        <div key={blog.id}>
                            <BlogCard />
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default BlogPage;
