'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/app/config/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.TOKEN, {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      window.location.href = '/leads';
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '28rem', width: '100%', padding: '2rem' }}>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            Sign in to CRM
          </h2>
        </div>
        <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          {error && <div style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              backgroundColor: loading ? '#9ca3af' : '#4f46e5',
              color: 'white',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#4f46e5', fontWeight: '500' }}>
              Sign up
            </Link>
          </p>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            <Link href="/forgot-password" style={{ color: '#4f46e5', fontWeight: '500' }}>
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}