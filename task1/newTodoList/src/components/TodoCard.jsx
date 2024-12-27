import React, { useState } from 'react';
import Edit from '../assets/Edit.png';
import Delete from '../assets/Delete.png';


const TodoCard = ({index,handleDeleteTodo}) => {
    const [list, Setlist] = useState('');
    const [allList, setAllList] = useState([]);
    const [todoHead,setTodoHead] = useState('Todo List');

    const AddTodoCont = (e) => {
        Setlist(e.target.value);
    };

    const AddTodo = () => {
        if (list.trim() !== '') {
            setAllList([...allList, { text: list, isEditing: false }]);
            Setlist('');
        }
    };

    const editText = (index) => {
        const updatedList = [...allList];
        updatedList[index].isEditing = !updatedList[index].isEditing;
        setAllList(updatedList);
    };

    const handleChange = (idx)=>{
        const updatedList = [...allList];
        updatedList[idx].isDone = !updatedList[idx].isDone;
        setAllList(updatedList);
    }

    const handleDelete = (idx)=>{
        const updatedList = [...allList];
        updatedList.splice(idx,1);
        setAllList(updatedList);
    }

    const handleHeading = (idx) =>{

    }

    return (
        <div className="container flex justify-center">
            <div className="bg-stone-100 p-4 h-96 max-w-3/12 mt-9 rounded-lg flex flex-col items-center gap-10 ">
                <div className='flex w-64'>
                    <div className='flex justify-end'>
                        <input className="text-center bg-transparent text-lg font-medium" 
                            value={todoHead === ''? 'Untitled': todoHead} 
                            onChange={(e)=>{
                                setTodoHead(e.target.value);
                            }}
                            autoFocus
                        />
                    </div>
                    <div className='flex justify-end pl-4'>
                        <img src={Delete} className="h-5 opacity-75 hover:opacity-100 hover:transition-all hover:h-6 hover:delay-50  cursor-pointer"
                        onClick={()=>handleDeleteTodo(index)}
                        />
                    </div>
                </div>
                <div className="flex gap-3 h-10 w-72">
                    <input
                        type="text"
                        className="bg-stone-300 p-2 w-3/4 rounded-md"
                        placeholder="Enter Something"
                        value={list}
                        onChange={(e) => AddTodoCont(e)}
                    />
                    <button
                        className="bg-gradient-to-r from-sky-500 to-indigo-600 p-2 rounded-md text-white w-16 hover:bg-gradient-to-r hover:from-sky-600 hover:to-indigo-800 hover:transition-all delay-1000"
                        onClick={AddTodo}
                    >
                        Add
                    </button>
                </div>

                <div className="w-full flex justify-center overflow-y-auto focus:transition-all delay-75 h-52">
                    <ul>
                        {allList.map((todo, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between text-lg bg-slate-400 my-2 rounded-md p-1 h-fit w-64 gap-3"
                            >
                                {todo.isEditing ? (
                                    <input
                                        type="text"
                                        className='bg-transparent focus:border-hidden overflow-hidden p-2 min-w-60'
                                        value={todo.text}
                                        onChange={(e) => {
                                            const updatedList = [...allList];
                                            updatedList[index].text = e.target.value;
                                            setAllList(updatedList);
                                        }}
                                        onBlur={() => editText(index)}
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        <div className="overflow-x-auto p-1 flex gap-2 w-48">
                                            <input
                                                type="checkbox"
                                                id={`inp${index}`}
                                                checked = {todo.isDone}
                                                onChange={()=> handleChange(index)}
                                            />
                                            <label
                                                className={`w-max text-sm ${todo.isDone ?'line-through':''}`}
                                                htmlFor={`inp${index}`}
                                            >
                                                {todo.text}
                                            </label>
                                        </div>
                                        <div className='flex items-center justify-between pr-2 h-9 w-11'> 
                                            <img
                                                src={Edit}
                                                className="h-3 opacity-75 hover:opacity-100 hover:transition-all hover:h-4 delay-50 cursor-pointer"
                                                onClick={() => editText(index)} 
                                            />

                                            <img src={Delete} 
                                                className="h-3 opacity-75 hover:opacity-100 hover:transition-all hover:h-4 delay-50 cursor-pointer"
                                                onClick={()=>handleDelete(index)}
                                            />
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
