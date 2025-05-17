import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';

// Connect to backend WebSocket
const socket = io('http://localhost:5050', { withCredentials: true });

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUser();
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({
    role: '',
    experience: '',
    topic: '',
    description: ''
  });

  // Fetch chats and set up Socket.IO listener
  useEffect(() => {
    if (user) {
      fetchChats();
      socket.on('newChat', (newChat) => {
        if (newChat.userId === user.id) {
          setSessions((prev) => [newChat, ...prev]);
        }
      });
    }

    return () => {
      socket.off('newChat');
    };
  }, [user]);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/chats', {
        params: { userId: user.id }
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in to create a session');
      return;
    }

    try {
      await axios.post('http://localhost:5050/api/chats', {
        userId: user.id,
        role: form.role,
        experience: form.experience,
        topic: form.topic,
        description: form.description
      });

      setForm({ role: '', experience: '', topic: '', description: '' });
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session');
    }
  };

  const startChat = (session) => {
    console.log(`Starting chat for ${session.role}`);
  };

  // Assign color classes for cards
  const getColorClass = (index) => {
    const colors = ['mint', 'cream', 'light-blue', 'peach', 'lavender', 'pink'];
    return colors[index % colors.length];
  };

  // Generate initials from role (e.g., "Frontend Developer" -> "FD")
  const getRoleInitials = (role) => {
    // Remove any unexpected characters (e.g., hyphens) and trim
    const cleanRole = role.replace(/[^a-zA-Z\s]/g, '').trim();
    const words = cleanRole.split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return cleanRole.substring(0, 2).toUpperCase();
  };

  // Format experience (e.g., "2" -> "2 Years")
  const formatExperience = (exp) => {
    return exp.includes('year') ? exp : `${exp} Years`;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Interview Prep AI</h2>
        <SignedIn>
          <div className="user-info">
            <UserButton />
            <div className="user-details">
              <span className="username">{user?.firstName} {user?.lastName}</span>
              <span className="logout-text">Logout</span>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="signin-btn">Login / Sign Up</button>
          </SignInButton>
        </SignedOut>
      </header>

      <main className="cards-grid">
        {sessions.map((session, index) => (
          <div
            className={`card ${getColorClass(index)}`}
            key={session._id}
            onClick={() => startChat(session)}
          >
            <div className="card-header">
              <span className="card-icon">{getRoleInitials(session.role)}</span>
              <div>
                <h3>{session.role}</h3>
                <p className="topics">{session.topic}</p>
              </div>
            </div>
            <div className="card-tags">
              <span>Experience: {formatExperience(session.experience)}</span>
              <span>{session.aiResponse?.length || 0} Q&A</span>
              <span>Last Updated: {new Date(session.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>
            </div>
            <p className="description">{session.description}</p>
          </div>
        ))}
      </main>

      <button className="add-new-btn" onClick={() => setModalOpen(true)}>
        <PlusCircle size={20} />
        <span>Add New</span>
      </button>

      {modalOpen && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') setModalOpen(false);
        }}>
          <div className="modal">
            <div className="modal-header">
              <div>
                <h3>Start a New Interview Journey</h3>
                <p className="modal-subtitle">Fill out a few quick details and unlock your personalized set of interview questions!</p>
              </div>
              <button className="close-btn" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="role">Target Role</label>
                <input
                  id="role"
                  type="text"
                  placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input
                  id="experience"
                  type="text"
                  placeholder="(e.g., 1 year, 3 years, 5+ years)"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="topic">Topics to Focus On</label>
                <input
                  id="topic"
                  type="text"
                  placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="(Any specific goals or notes for this session)"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Create Session</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;