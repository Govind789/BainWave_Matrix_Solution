import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className='home d-flex justify-content-center align-items-center'>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className='text-center mb-3'>Organize your <br/> work and life, finally</h1>
                <p className='fs-5 mb-4'>
                    Become focused, organized, and calm with <br/>
                    todo app. The World's #1 task manager app.

                </p>
                <button className="btn btn-outline-light bg-dark text-white " type="submit">Make ToDo List</button>
            </div>
            
        </div>
    );
}

export default Home;
