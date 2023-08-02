import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="input-field"
            />
          </div>
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
            Register Now!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
