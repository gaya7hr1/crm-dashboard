'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/config/api';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('New');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(API_ENDPOINTS.LEADS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(response.data);
    } catch (err) {
      setError('Failed to fetch leads');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (editingId) {
        await axios.put(`${API_ENDPOINTS.LEADS}${editingId}/`, {
          name,
          email,
          phone,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post(API_ENDPOINTS.LEADS, {
          name,
          email,
          phone,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setName('');
      setEmail('');
      setPhone('');
      setStatus('New');
      fetchLeads();
    } catch (err) {
      setError('Failed to save lead');
    }
  };

  const handleEdit = (lead: Lead) => {
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setStatus(lead.status);
    setEditingId(lead.id);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_ENDPOINTS.LEADS}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeads();
    } catch (err) {
      setError('Failed to delete lead');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setPhone('');
    setStatus('New');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>CRM Leads</h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{editingId ? 'Edit Lead' : 'Add New Lead'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter name"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter phone"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                {editingId ? 'Update Lead' : 'Add Lead'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          {error && <div style={{ color: '#dc2626', marginTop: '1rem' }}>{error}</div>}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.status}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(lead)}
                      style={{
                        color: '#4f46e5',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '1rem',
                        textDecoration: 'underline',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      style={{
                        color: '#dc2626',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}