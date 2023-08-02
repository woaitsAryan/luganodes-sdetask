import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="grid place-items-center h-screen">
            <section className="hero-section">
                <h1 className='font-2xl font-bold text-center mb-4'>Welcome!</h1> {/* Center-align the text */}
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='p-5 rounded-md bg-red-600 md:w-1/2 flex flex-col justify-center items-center'> {/* Center-align text */}
                        <p className="text-center mb-2">If you're a new user</p>
                        <Link to="/register" className="cta-button p-5 md:p-10">Sign Up</Link>
                    </div>
                    <div className='p-5 rounded-md bg-red-600 md:w-1/2 flex flex-col justify-center items-center'> {/* Center-align text */}
                        <p className="text-center mb-2">If you're a registered user</p>
                        <Link to="/login" className="cta-button p-5 md:p-10">Login</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
