import React, { useState } from 'react';
import TodoCard from './TodoCard';

const TodoList = ({ createTodo }) => {
    const [allTodo, setAllTodo] = useState([]);
    const [load,setLoad]= useState(null);

    const handleTodo = () => {
        if (createTodo) {
            setAllTodo([...allTodo, { id: allTodo.length, text: 'New Todo' }]);
        }
        setLoad(allTodo.length);
        setTimeout(() => setLoad(null), 200);
    };

    const handleDeleteTodo = (index)=>{
        const updatedList = [...allTodo];
        updatedList.splice(index,1);
        setAllTodo(updatedList);
    }

    return (
        !allTodo.length? 
        <div className='container flex flex-col h-screen justify-evenly p-8 items-center'>
            <h1 className='text-5xl font-bold italic text-gray-900 transform transition-all duration-300 hover:text-gray-700 hover:scale-110 drop-shadow-lg'>
                No Todo Created
            </h1>
            <div className="relative flex justify-center">
                <button 
                    onClick={handleTodo}
                    className='p-4 w-56 mt-9 rounded-lg flex justify-center items-center bg-stone-300 font-semibold relative z-10'
                >
                    Add Todo
                </button>
            </div>
        </div>


        :
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 pb-12 bg-gradient-to-r from-sky-500 to-indigo-800'>
            {allTodo.map((todo, index) => (
                <div key={todo.id} className={`transform transition-transform duration-500 ${
                    load === index ? 'translate-x-[-2000px]' : 'translate-x-0'
                }`}> 
                    <TodoCard index={index} handleDeleteTodo={handleDeleteTodo}/>
                </div>
            ))}

            <div className='container flex justify-center'>
                <button onClick={handleTodo} className='p-4 h-96 w-80 mt-9 rounded-lg flex justify-center items-center bg-stone-300 font-semibold'>
                    AddTodo
                </button>
            </div>
        </div>
    );
}

export default TodoList;
