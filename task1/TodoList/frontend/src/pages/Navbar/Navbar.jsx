import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from '../../context/UserContext';

const Navbar = () => {
  
    const [clr, setclr] = useState('danger');


    const { setIsLoggedIn } = useContext(UserContext);

    // useEffect(()=>{
    // if (isAuthenticated) {
    //     setclr('success');
    // }
    // },[])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand me-5" href="#">ToDoList</a>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item me-4">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link active" href="#">About</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link active" href="#">ToDo</a>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link active" href="#">History</a>
                            </li>
                        </ul>
                        <form className="d-flex me-4">
                            <span className={`p-3 h-25 bg-${clr} me-5 rounded-circle`}></span>
                        
                            <button className="btn btn-outline-light" type="submit">Log In</button>
                            

                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
