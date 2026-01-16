'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/app/config/api';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.PASSWORD_RESET, {
        email,
      });
      setToken(response.data.token);
      setSuccess('Reset link sent! Use the token below to reset your password.');
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.email?.[0] || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.PASSWORD_RESET_CONFIRM, {
        token,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '28rem', width: '100%', padding: '2rem' }}>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            Reset Your Password
          </h2>
        </div>

        {step === 1 ? (
          <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="token" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Reset Token
              </label>
              <input
                id="token"
                type="text"
                style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="newPassword" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPasswordConfirm" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Confirm Password
              </label>
              <input
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                type="password"
                required
                placeholder="Confirm new password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
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
              }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError('');
                setSuccess('');
                setToken('');
              }}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#4f46e5',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Back to email entry
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            <Link href="/login" style={{ color: '#4f46e5', fontWeight: '500' }}>
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}