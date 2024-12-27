import React, { useState, useEffect } from 'react';
import HeaderPage from './HeaderPage';

const MainPage = ({ setcreateTodo }) => {
  const [index, setIndex] = useState(0); 
  const [isTyping, setIsTyping] = useState(true); 
  const [textIndex, setTextIndex] = useState(0); 
  const [currentText, setCurrentText] = useState(''); 

  const texts = [
    "Create Todo List using this interactive App",
    "By just clicking on the Create Button",
    "Start managing your tasks more effectively",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) =>
        isTyping ? prev + 1 : prev - 1 
      );

     
      if (isTyping && index === texts[textIndex].length) {
        setIsTyping(false); 
      } 
      
      else if (!isTyping && index === 0) {
        setIsTyping(true); 
        setTextIndex((prev) => (prev + 1) % texts.length); 
      }
    }, 100); 

    return () => clearTimeout(timeout); 
  }, [index, isTyping, textIndex, texts]);

  useEffect(() => {
    setCurrentText(texts[textIndex].slice(0, index)); 
  }, [index, textIndex, texts]);

  return (
    <>
      
      <HeaderPage />
      <div className='flex justify-center min-h-screen pt-20 bg-gradient-to-r from-sky-500 to-indigo-800'>
        <div className='relative flex justify-center h-80 w-full max-w-lg bg-white rounded-xl shadow-2xl p-10'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-800 to-pink-700 opacity-70 rounded-xl'></div>
          <div className='relative z-10 text-center text-white'>
            <h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-slate-200 mb-6'>
              {currentText}
            </h1>

            <p className='text-lg text-gray-100 mb-6 opacity-90'>
              This app allows you to easily create, manage, and organize your tasks in a simple and interactive way.
            </p>

            <div className="relative flex justify-center mt-6">
              <button
                className='btn flex justify-center items-center px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl'
                onClick={() => setcreateTodo(true)}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
