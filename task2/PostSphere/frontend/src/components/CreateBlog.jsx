import React, { useRef, useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Type from '../assets/Type.webp'; 
import UserContext from '../../context/UserContext';

const CreateBlog = () => {
    const fileInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [image, setImage] = useState(null);
    const [storyError, setStoryError] = useState('');
    const [titleError, setTitleError] = useState('');
    const { blogs, setBlogs, userInfo } = useContext(UserContext);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            setImage(file);
        } else {
            console.error("No file selected");
            setImage(null);
        }
    };

    useEffect(() => {
        const loadDefaultImage = async () => {
            try {
                const response = await fetch(Type);
                const blob = await response.blob();
                const file = new File([blob], "default-image.webp", { type: blob.type }); 
                setImage(file); 
            } catch (error) {
                console.error("Error loading default image:", error);
            }
        };

        loadDefaultImage();
    }, []);

    const handlePost = async () => {
        let valid = true;

        if (!title || !story) {
            return;
        }

        if (title.length > 100) {
            setTitleError("Title cannot be more than 100 characters");
            valid = false;
        } else {
            setTitleError("");
        }

        if (story.length > 500) {
            setStoryError("Story cannot be more than 500 characters");
            valid = false;
        } else {
            setStoryError("");
        }

        if (!valid) {
            return;
        }

        const blogImage = image || Type;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("story", story);
        formData.append("user", userInfo.id);
        if (image) {
            formData.append("image", image); 
        }

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        const res = await fetch('http://localhost:3000/api/create', {
            method: "POST",
            body: formData,
        });

        // console.log(res);

        if (res.status === 'success') {
            setBlogs([
                ...blogs,
                {
                    title: title,
                    story: story,
                    user: userInfo,
                    createdAt: Date.now(),
                    image: blogImage,
                },
            ]);

        }
        setTitle('');
        setStory('');
        setImage(null);
        setStoryError('');
        setTitleError('');
        fileInputRef.current.value = "";
    };

    return (
        <div className='min-h-screen w-screen flex flex-col bg-slate-300'>
            <Navbar page='Create' />
            <div className='flex flex-col items-center mt-5 gap-7'>
                <div className='flex items-center w-full'>
                    <div className='relative w-full flex justify-center'>
                        <img
                            src={image ? URL.createObjectURL(image) : Type}
                            alt="Blog"
                            className='h-96 w-3/4 rounded-md border-gray-600 shadow-lg shadow-black block'
                        />
                        <div className='absolute flex flex-col items-center justify-center w-full h-full'>
                            <span className='opacity-0 top-0 left-0 h-full flex items-center justify-center bg-opacity-35 bg-slate-500 hover:opacity-100 w-3/4 rounded-md transition-all text-white cursor-pointer' onClick={handleClick}>
                                Click image to change
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className='hidden'
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-3/4 flex flex-col gap-6'>
                    <input
                        type="text"
                        name="title"
                        className='w-full h-12 p-2 rounded-md placeholder-slate-700 overflow-hidden outline-none shadow-neutral-700 shadow-md'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        name="story"
                        className='p-2 placeholder-slate-700 outline-none rounded-lg shadow-neutral-700 shadow-md'
                        placeholder='Tell your story'
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                    ></textarea>

                    <button
                        className='bg-white p-2 rounded-md w-32 hover:bg-slate-400 transition-all delay-75 shadow-md shadow-neutral-500'
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
