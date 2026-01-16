'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/app/config/api';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.REGISTER, {
        username,
        email,
        password,
        password_confirm,
      });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data || 'Failed to create account';
      setError(JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '28rem', width: '100%', padding: '2rem' }}>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            Create Your Account
          </h2>
        </div>
        <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
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
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          <div>
            <label htmlFor="password_confirm" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Confirm Password
            </label>
            <input
              id="password_confirm"
              name="password_confirm"
              type="password"
              required
              placeholder="Confirm Password"
              value={password_confirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          {error && <div style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</div>}
          {success && <div style={{ color: '#15803d', fontSize: '0.875rem' }}>{success}</div>}
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
              marginTop: '0.5rem',
            }}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#4f46e5', fontWeight: '500' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}