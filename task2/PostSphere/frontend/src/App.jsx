import './App.css'
import BlogPage from './components/BlogPage'
import HomePage from './components/HomePage'
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import { useState } from 'react'
import UserContext from '../context/UserContext'
import CreateBlog from './components/CreateBlog'
import HistoryPage from './components/HistoryPage'

function App() {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });
  const [isLoggedin,setisLoggedin] = useState(()=>{
        if(localStorage.getItem('authorization'))
            return true;
        else
            return false;
    });
  
  const [blogs,setBlogs] = useState([]);

  const login = () => {
    setisLoggedin(true);
  };

  const logout = () => {
    localStorage.removeItem("authorization");
    setisLoggedin(false);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element : <HomePage/>
    },
    {
      path : '/create',
      element : isLoggedin? <CreateBlog/> : <Navigate to='/login'/>
    },
    {
      path : '/blogs',
      element : isLoggedin? <BlogPage/>: <Navigate to='/login'/>
    },
    {
      path : '/home',
      element : <HomePage/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : '/signup',
      element : <Signup/>
    },
    {
      path : '/history',
      element : isLoggedin? <HistoryPage/>: <Navigate to='/login'/>
    },
    
  ])


  return (
    <UserContext.Provider 
      value={{
        setisLoggedin,
        isLoggedin,
        login,
        logout,
        blogs,
        setBlogs,
        userInfo,
        setUserInfo
      }}
      >
      <RouterProvider router={router}/>
    </UserContext.Provider>
  )
}

export default App
