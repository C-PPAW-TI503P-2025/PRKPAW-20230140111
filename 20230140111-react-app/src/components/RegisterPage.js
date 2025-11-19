import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        name,
        role,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError('Registrasi gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input className="w-full border p-2 rounded"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)} required/>

          <select className="w-full border p-2 rounded"
            value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="mahasiswa">Mahasiswa</option>
            <option value="admin">Admin</option>
          </select>

          <input className="w-full border p-2 rounded"
            type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required/>

          <input className="w-full border p-2 rounded"
            type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required/>

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Register
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
