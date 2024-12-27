import React,{useRef,useContext,useState} from 'react';
import Navbar from './Navbar';
import Type from '../assets/Type.webp'
import UserContext from '../../context/UserContext';

const CreateBlog = () => {
    const fileInputRef = useRef(null);
    const [title,setTitle] = useState('');
    const [story,setStory] = useState('');
    const [storyError,setStoryError] = useState('');
    const [titleError,setTitleError] = useState('');
    const {blogs,setBlogs,userInfo} = useContext(UserContext);


    const handleClick = ()=>{
        fileInputRef.current.click();
    };

    const handlePost = ()=>{
        let valid = true;
        if(!title || !story){
            return;
        }

        if(title.length > 100 ){
            setTitleError("title cannot be of more than 100 characters");
            valid = false;
        }else{
            setTitleError("");
        }

        if(story.length > 500){
            setStoryError("story cannot be of more than 500 characters");
            valid = false;
        }else{
            setStoryError("");
        }

        if(!valid){
            return;
        }

        setBlogs([...blogs, {
            title: title,
            story: story,
            user: userInfo,
            createdAt: Date.now()
        }])
    }

    return (
        <div className='min-h-screen w-screen flex flex-col bg-slate-300'>
            <Navbar page='Create'/>
            <div className='flex flex-col items-center mt-5 gap-7'>
                <div className='flex items-center w-full'>
                    <div className='relative w-full flex justify-center'>
                        <img 
                            src={Type} 
                            className='h-96 w-3/4 rounded-md border-gray-600 shadow-lg shadow-black block' 
                        />
                        <div className='absolute flex flex-col items-center justify-center w-full h-full ' >
                            <span className='opacity-0 top-0 left-0 h-full flex items-center justify-center bg-opacity-35 bg-slate-500 hover:opacity-100 w-3/4 rounded-md transition-all text-white cursor-pointer' onClick={handleClick}>click image to change</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className='hidden'
                                onChange={(e) => console.log(e.target.files)} 
                            />
                        </div>
                    </div>

                </div>


                <div className='w-3/4 flex flex-col gap-6'>
                    <input type="text" name="" id=""  className='w-full h-12 p-2 rounded-md placeholder-slate-700 overflow-hidden outline-none shadow-neutral-700 shadow-md' placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>

                    <textarea name="" id="" className='p-2 placeholder-slate-700 outline-none rounded-lg shadow-neutral-700 shadow-md' placeholder='Tell your Strory' value={story} onChange={(e)=>setStory(e.target.value)}></textarea>
                <button className='bg-white p-2 rounded-md w-32 hover:bg-slate-400 transition-all delay-75 shadow-md shadow-neutral-500' onClick={handlePost}>Post</button>
                </div>

            </div>
            
            
        </div>
    );
}

export default CreateBlog;
