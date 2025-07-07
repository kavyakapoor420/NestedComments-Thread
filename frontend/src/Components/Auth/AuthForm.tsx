    import React, { useState, useContext } from 'react';
    import { AuthContext } from '../../Context/AuthContext'

    interface AuthFormProps {
      type: 'login' | 'register';
      onSuccess: () => void;
    }

    const API_BASE_URL = 'http://localhost:3000';

    const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
      const [username, setUsername] = useState<string>('');
      const [password, setPassword] = useState<string>('');
      const [message, setMessage] = useState<string>('');
      const { login } = useContext(AuthContext);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
          const response = await fetch(`${API_BASE_URL}/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if (response.ok) {
            setMessage(data.message);
            if (type === 'login') {
              login(data.token, data.user);
              onSuccess();
            } else {
              onSuccess();
            }
          } else {
            setMessage(data.message || `Error ${type}ing.`);
          }
        } catch (error) {
          console.error(`Error during ${type}:`, error);
          setMessage(`Network error during ${type}. Please try again later.`);
        }
      };

      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {type === 'register' ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              {type === 'register' ? 'Register' : 'Login'}
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes('successfully') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      );
    };

    export default AuthForm;