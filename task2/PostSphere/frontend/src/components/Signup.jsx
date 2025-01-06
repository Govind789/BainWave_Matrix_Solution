import React,{useState} from 'react';
import View from '../assets/View.png'
import Hide from '../assets/Hide.png'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword]= useState('');
    const [showPassword,setshowPassword] = useState('text');
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const togglePassword = ()=>{
        if(showPassword === 'text'){
            setshowPassword('password');
        }else{
            setshowPassword('text');
        }
    }
    const handleName = (name)=>{
        const regName = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

        const isOk = regName.test(name);
        return isOk;
    }

    const handlePassword = (password)=>{
        const regPass = /^[a-zA-Z0-9.\-_]{6,}$/;

        const isOk = regPass.test(password);
        return isOk;
    }

    const handleClick = async(e)=>{
        e.preventDefault();
        let valid = true;

        try{

            if (username.trim() === "") {
                setNameError("Email is required.");
                valid = false;
            } else {
                setNameError("");
            }

            if (!handleName(username)) {
                setNameError("Please enter a valid email address.");
                valid = false;
            } else {
                setNameError("");
            }

            if(!handlePassword(password)){
                setPasswordError("Please enter a valid password");
                valid = false;
            }else{
                setPasswordError("");
            }

            if (password.length < 6) {
                setPasswordError("Password must be at least 6 characters long.");
                valid = false;
            } else {
                setPasswordError("");
            }

            if (!valid) {
                return;
            }

            if (!username && !password) {
                return;
            }

            const res = await fetch(`https://postsphere-ten.vercel.app/signup`, { 
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer "+ localStorage.getItem("authorization"),
                },
                method: "POST",
                body: JSON.stringify({username, password }),
            });            
    
            const data = await res.json();

            if(data.status === 'success'){
                console.log(data);
            }else{
                setPasswordError(data.msg);
            }

        }catch(err){
            console.log(err);
        }
    }


    return (
        <div className='h-screen w-screen flex flex-col bg-sky-950'>
            <Navbar page='SignUp'/>
            <div className='flex items-center w-screen h-full justify-center'>
                <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/ flex flex-col items-center justify-around gap-6 p-6 rounded-lg mt-12">
                    <h1 className="text-6xl font-medium text-white mb-4">SignUp</h1>
                    <div className='w-full flex flex-col items-center'>
                        <input
                            type="text"
                            name="uname"
                            id="uname"
                            placeholder="Email"
                            className="p-2 rounded-lg w-64 placeholder-gray-700 focus:outline-none"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {nameError && <span className="text-red-600 text-sm mt-2">{nameError}</span>}
                    </div>

                    <div className='w-full flex flex-col items-center'>
                        <div className='relative w-64'>
                            <input
                                type={showPassword}
                                name="upass"
                                id="upass"
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="p-2 rounded-lg w-full placeholder-gray-700 focus:outline-none"
                            />
                            <span
                                onClick={togglePassword}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                            >
                                <img src={showPassword === "text" ? Hide : View} className='h-6' alt="toggle visibility"/>
                            </span>
                        </div>
                        {passwordError && <span className="text-red-600 text-sm mt-2">{passwordError}</span>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <button onClick={handleClick} 
                            className='h-10 w-64 bg-white rounded-md hover:bg-slate-400 transition-all delay-75 text-lg font-medium'>
                                Signup
                        </button>
                        <div className='flex text-white font-thin text-sm hover:text-gray-400 justify-end'>
                            <Link to='/login'>Already have a account ? login.</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Signup;
