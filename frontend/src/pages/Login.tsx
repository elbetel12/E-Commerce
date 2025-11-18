import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import client from '@/lib/feathersClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await client.service('authentication').create({
        strategy: 'local',
        email,
        password
      });
      const { accessToken, user } = response;

      if (user.role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        return;
      }

      localStorage.setItem('accessToken', accessToken);
      console.log('Logged in successfully!');
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
