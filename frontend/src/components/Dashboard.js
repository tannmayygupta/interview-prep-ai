import React, { useState } from 'react';
import './Dashboard.css';
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUser(); // Get current user info from Clerk

  // Predefined interview sessions to match the screenshot
  const [sessions, setSessions] = useState([
    {
      id: 'FD',
      role: 'Frontend Developer',
      topics: 'React.js, DOM manipulation, CSS Flexbox',
      experience: '2 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Preparing for product-based company interviews',
      color: 'mint'
    },
    {
      id: 'BD',
      role: 'Backend Developer',
      topics: 'Node.js, Express, REST APIs, MongoDB',
      experience: '3 Years',
      qaCount: 20,
      updatedAt: '1st May 2025',
      description: 'Want to master backend system design and performance',
      color: 'cream'
    },
    {
      id: 'FS',
      role: 'Full Stack Developer',
      topics: 'MERN stack, deployment strategies, authentication',
      experience: '4 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Getting ready for startup tech rounds',
      color: 'light-blue'
    },
    {
      id: 'DA',
      role: 'Data Analyst',
      topics: 'SQL, Excel, Data Visualization, Power BI',
      experience: '2 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Targeting analyst roles in finance domain',
      color: 'peach'
    },
    {
      id: 'DE',
      role: 'DevOps Engineer',
      topics: 'CI/CD, Docker, Kubernetes, AWS',
      experience: '5 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Switching to a cloud-native role with more automation',
      color: 'light-blue'
    },
    {
      id: 'UD',
      role: 'UI/UX Designer',
      topics: 'Figma, user journey, wireframing, accessibility',
      experience: '3 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Preparing for top product design interviews',
      color: 'lavender'
    },
    {
      id: 'MA',
      role: 'Mobile App Developer',
      topics: 'React Native, Flutter, performance optimization',
      experience: '2 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Need cross-platform expertise for startup interviews',
      color: 'pink'
    },
    {
      id: 'AE',
      role: 'AI/ML Engineer',
      topics: 'Python, scikit-learn, model deployment, NLP',
      experience: '1 Year',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Cracking ML internship and entry-level roles',
      color: 'mint'
    },
    {
      id: 'PM',
      role: 'Product Manager',
      topics: 'Roadmapping, user stories, KPIs, stakeholder communication',
      experience: '4 Years',
      qaCount: 10,
      updatedAt: '30th Apr 2025',
      description: 'Pivoting into tech PM from business analyst background',
      color: 'lavender'
    }
  ]);

  const [form, setForm] = useState({
    role: '',
    experience: '',
    topics: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate ID from role (first two letters)
    const generateId = () => {
      if (!form.role) return '';
      const words = form.role.split(' ');
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return form.role.substring(0, 2).toUpperCase();
    };

    // Generate random color class
    const colors = ['mint', 'cream', 'light-blue', 'peach', 'lavender', 'pink'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newSession = {
      ...form,
      id: generateId(),
      qaCount: 10, // Default value for new sessions
      updatedAt: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      color: randomColor
    };
    
    setSessions([...sessions, newSession]);
    setForm({ role: '', experience: '', topics: '', description: '' });
    setModalOpen(false);
  };

  const startChat = (session) => {
    // This would typically navigate to a chat interface
    console.log(`Starting chat for ${session.role}`);
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
        {sessions.map((session) => (
          <div 
            className={`card ${session.color}`} 
            key={session.id}
            onClick={() => startChat(session)}
          >
            <div className="card-header">
              <span className="card-icon">{session.id}</span>
              <div>
                <h3>{session.role}</h3>
                <p className="topics">{session.topics}</p>
              </div>
            </div>
            <div className="card-tags">
              <span>Experience: {session.experience}</span>
              <span>{session.qaCount} Q&A</span>
              <span>Last Updated: {session.updatedAt}</span>
            </div>
            <p className="description">{session.description}</p>
          </div>
        ))}
      </main>

      <button className="add-new-btn" onClick={() => setModalOpen(true)}>
        <PlusCircle size={20} />
        <span>Add New</span>
      </button>

      {/* Modal */}
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
                <label htmlFor="topics">Topics to Focus On</label>
                <input
                  id="topics"
                  type="text"
                  placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
                  value={form.topics}
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
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