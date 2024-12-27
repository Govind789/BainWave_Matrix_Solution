import './App.css'
import BlogPage from './components/BlogPage'
import HomePage from './components/HomePage'
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import { useState } from 'react'
import UserContext from '../context/UserContext'
import CreateBlog from './components/CreateBlog'

function App() {
  const [isLoggedin,setisLoggedin] = useState(false);
  const [userInfo,setUserInfo] = useState(null);
  
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
      element : isLoggedin?<BlogPage/>: <Navigate to='/login'/>
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
      element : <HomePage/>
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
