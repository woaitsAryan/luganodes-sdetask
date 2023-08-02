import { useState } from 'react';
import { ethers } from 'ethers';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State to track Metamask login
    const [metamaskLoggedIn, setMetamaskLoggedIn] = useState(false);

    async function loginUser(event) {
        event.preventDefault();
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
            alert('Login successful');
            window.location.href = '/dashboard';
        } else {
            alert('Please check your email and password.');
        }
    }

    async function loginWithMetamask() {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []); // Request permission
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
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                {/* Email/password fields */}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <input type="submit" value="Login" />
            </form>

            {/* Metamask login */}
            {!metamaskLoggedIn && (
                <button onClick={loginWithMetamask}>Login with Metamask</button>
            )}
            {metamaskLoggedIn && <p>Logged in with Metamask</p>}
        </div>
    );
}

export default Login;
