import React, { useState,useContext } from 'react';
import View from '../assets/View.png'
import Hide from '../assets/Hide.png'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Login = () => {
    
    const [username,setUsername] = useState('');
    const [password,setPassword]= useState('');
    const [showPassword,setshowPassword] = useState('text');
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {login,setUserInfo} = useContext(UserContext);

    const togglePassword = ()=>{
        if(showPassword === 'text'){
            setshowPassword('password');
        }else{
            setshowPassword('text');
        }
    }

    const handleName = (email)=>{
        const regName = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        return regName.test(email);
    }

    const handlePassword = (passw)=>{
        const regPass = /^[a-zA-Z0-9.\-_]{6,}$/;
        return regPass.test(passw);
    }

    const handleClick = async()=>{

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

            const res = await fetch('https://postsphere-ten.vercel.app/login', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            
            const data = await res.json();
            // console.log(data);
    
            if(data.status === "success"){
                localStorage.setItem("authorization",data.data.token);
                const user = await data.data.user;
                setUserInfo(user);
                localStorage.setItem("userInfo", JSON.stringify(user));
                // console.log(user);
                login();
            }else if(data.status === "failed"){
                setPasswordError(data?.msg);
            }

        }catch(err){
            console.log(err);
        }
    }



    return (
        <div className='h-screen w-screen flex flex-col bg-sky-950'>
            <Navbar page='Login'/>
            <div className='flex items-center w-screen h-full justify-center'>
                <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/ flex flex-col items-center justify-around gap-6 p-6 rounded-lg mt-12">
                    <h1 className="text-6xl font-medium text-white mb-4">Login</h1>

                    <div className='w-full flex flex-col items-center'>
                        <input
                            type="text"
                            name="uname"
                            id="uname"
                            placeholder="Username"
                            className="p-2 rounded-lg w-64 placeholder-gray-700 focus:outline-none"
                            value={username}
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
                            className='h-10 w-64 bg-white rounded-md hover:bg-slate-500 transition-all delay-75 text-lg font-medium'>
                                Login
                        </button>
                        <div className='flex text-white font-thin text-sm hover:text-gray-400 transition-all delay-75 justify-end'>
                            <Link to='/signup'>Don't have a account ? Signup.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
