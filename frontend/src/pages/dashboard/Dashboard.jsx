import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '@clerk/clerk-react';
import { ThemeContext } from '../../context/ThemeContext';
import './dashboard.css';

// ✅ API URL from environment variable
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log("API_URL =", API_URL);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [entries, setEntries] = useState(() => {
    const stored = localStorage.getItem('passwords');
    return stored ? JSON.parse(stored) : [];
  });

  const [newEntry, setNewEntry] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef(null);

  const { getToken } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Updated submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);

    try {
      const token = await getToken();

      const res = await fetch(`${API_URL}/api/passwords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });

      // ✅ Check if the request was successful
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      // ✅ Log backend response
      const data = await res.json();
      console.log('Server response:', data);

      // ✅ Success message
      alert('🎉 Password Saved!');

      // ✅ Clear the form only after a successful save
      setNewEntry({
        name: '',
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err);

      // ❌ Show error if the backend request failed
      alert('❌ Failed to save password.');
    }
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    alert('🗑️ Password Deleted!');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="dashboard-wrapper">
      <button
        className="hamburger"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dashboard-container">
        <div className="header">
          <h1 className="dashboard-title">🔐 TAS-PASS</h1>

          <button
            onClick={toggleTheme}
            className="theme-toggle-icon"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="top-bar">
          <input
            type="text"
            placeholder="🔍 Search by site name..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar form"
          />

          <button
            onClick={scrollToForm}
            className="add-btn"
          >
            ➕ Add New
          </button>
        </div>

        <div className="password-section">
          <h2>🔒 Stored Passwords</h2>

          <button
            onClick={() => setShowPasswords(!showPasswords)}
            className="toggle-btn all_buttons"
          >
            {showPasswords
              ? '🙈 Hide Passwords'
              : '👁️ Show Passwords'}
          </button>

          <div className="entries">
            {filteredEntries.length === 0 ? (
              <p className="no-entries">
                No matching passwords found.
              </p>
            ) : (
              filteredEntries.map((entry, index) => (
                <div
                  key={index}
                  className={`entry theme-${index % 4}`}
                >
                  <h3>{entry.name}</h3>

                  <p>👤 {entry.username}</p>

                  <p>
                    🔑{' '}
                    {showPasswords
                      ? entry.password
                      : '*'.repeat(entry.password.length)}
                  </p>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className="form-section"
          ref={formRef}
        >
          <h2>Add New Entry</h2>

          <form
            onSubmit={handleSubmit}
            className="form"
          >
            <input
              type="text"
              name="name"
              className="form_input"
              placeholder="Website Name"
              value={newEntry.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="username"
              className="form_input"
              placeholder="Username or Email"
              value={newEntry.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="form_input"
              placeholder="Password"
              value={newEntry.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="all_buttons"
            >
              💾 Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;