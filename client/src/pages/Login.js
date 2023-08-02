import React, { useState } from 'react';
import { ethers } from 'ethers';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [metamaskLoggedIn, setMetamaskLoggedIn] = useState(false);

    async function loginUser(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:1337/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (data.user) {
                alert('Email/password login successful');
                window.location.href = '/dashboard';
            } else {
                alert('Email/password login failed');
            }
        } catch (error) {
            console.error('Email/password login error:', error);
        }
    }

    async function loginWithMetamask() {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                const response = await fetch('http://localhost:1337/api/login/metamask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        address,
                    }),
                });

                const data = await response.json();
                if (data.user) {
                    alert('Metamask login successful');
                    setMetamaskLoggedIn(true);
                    window.location.href = '/dashboard';
                } else {
                    alert('Metamask login failed');
                }
            } catch (error) {
                console.error('Metamask login error:', error);
            }
        } else {
            alert('Metamask is not installed or not accessible');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={loginUser}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="input-field"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="input-field"
                        />
                    </div>
                    <button
                        type="submit"
                        className="cta-button w-full py-3 text-white font-semibold rounded-md bg-red-600 hover:bg-red-700"
                    >
                        Login with Email/Password
                    </button>
                </form>
                {!metamaskLoggedIn && (
                    <button
                        onClick={loginWithMetamask}
                        className="cta-button w-full py-3 mt-4 text-white font-semibold rounded-md bg-green-600 hover:bg-green-700"
                    >
                        Login with Metamask
                    </button>
                )}
                {metamaskLoggedIn && <p className="mt-4">Logged in with Metamask</p>}
            </div>
        </div>
    );
}

export default Login;
