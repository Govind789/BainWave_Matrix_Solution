import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='h-screen w-screen flex flex-col bg-slate-300'>
            <Navbar page='HomePage'/>
            <div className='flex items-center w-screen h-full justify-center'>
                <div className=" w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 bg-sky-950 flex flex-col items-center justify-around gap-4 p-12 rounded-lg shadow-lg mt-12">
                    <h1 className="text-8xl font-bold text-white mb-4">Post Sphere</h1>
                    <p className="text-gray-400 font-medium text-xl text-start">
                        Create blogs by sharing your views and knowledge, engage with others’ opinions, or provide your thoughts on their blogs.
                    </p>
                    <button onClick={()=>navigate('/create')} className='h-10 w-64 bg-white rounded-lg hover:bg-slate-500 transition-all delay-75 text-lg font-medium'>Create</button>
                </div>
            </div>
            
        </div>
    );
}

export default HomePage;
