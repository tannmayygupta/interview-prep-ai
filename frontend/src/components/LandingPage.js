import React from 'react';
import './LandingPage.css';
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Interview Prep AI</h2>
        </div>
        <div className="navbar-right">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="login-button">Login / Sign Up</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="user-area">
              <a href="/dashboard" className="dashboard-link">Dashboard</a>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="ai-tag">
              <span>✨ AI Powered</span>
            </div>
            <h1 className="hero-title">
              Ace Interviews with 
              <span className="highlight"> AI-Powered</span> Learning
            </h1>
            <button className="get-started-btn">Get Started</button>
          </div>
          <div className="hero-right">
            <p className="hero-description">
              Get role-specific questions, expand answers when you need them, dive 
              deeper into concepts, and organize everything your way. From 
              preparation to mastery — your ultimate interview toolkit is here.
            </p>
            <div className="demo-container">
              <div className="demo-header">
                <div className="demo-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="demo-url">
                  <span>https://interviewprogram.com/interview-prep</span>
                </div>
                <div className="demo-actions">
                  {/* Action icons can stay here */}
                </div>
              </div>
              <div className="demo-content">
                <div className="demo-sidebar">
                  <h3>Interview Prep AI</h3>
                  <div className="profile">
                    <div className="profile-img"></div>
                    <div className="profile-info">
                      <span className="name">Mike William</span>
                      <span className="logout">Logout</span>
                    </div>
                  </div>
                  <div className="job-title">
                    <h4>Frontend Developer</h4>
                    <p>React.js, DOM manipulation, CSS Flexbox</p>
                    <div className="tags">
                      <span className="tag">Experience: 2 years</span>
                      <span className="tag">Q&A: 4</span>
                      <span className="tag">Last Updated 30th Apr 2023</span>
                    </div>
                  </div>
                  <div className="qa-section">
                    <h4>Interview Q & A</h4>
                    <div className="question">
                      <p>What is JSX? Explain its role in React.</p>
                    </div>
                  </div>
                </div>
                <div className="flexbox-guide">
                  <div className="guide-header">
                    <h3>CSS Flexbox: A Beginner's Guide</h3>
                    <span className="close-icon">×</span>
                  </div>
                  <div className="guide-content">
                    <p>
                      CSS Flexbox is a powerful layout model in CSS. It's designed to make it easier to 
                      design flexible and responsive web page layouts without having to rely on floats or 
                      positioning...
                    </p>
                    <h4>Basic Concepts:</h4>
                    <ol>
                      <li>
                        <strong>Flex Container:</strong> This is the parent element. You make an element a flex container 
                        by setting <code>display: flex;</code> or <code>display: inline-flex;</code>.
                      </li>
                    </ol>
                    <div className="code-block">
                      <pre><code>{`.container {\n  display: flex;\n}`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Interview Prep AI</h3>
            <p>Your ultimate interview preparation platform</p>
          </div>
          <div className="footer-right">
            <div className="footer-links">
              <h4>Connect with us</h4>
              <ul>
                <li><button className="footer-link">Contact</button></li>
                <li><button className="footer-link">About Us</button></li>
                <li><button className="footer-link">Terms of Service</button></li>
                <li><button className="footer-link">Privacy Policy</button></li>
              </ul>
            </div>
            <div className="footer-social">
              <h4>Follow us</h4>
              <div className="social-icons">
                <button className="social-icon">LinkedIn</button>
                <button className="social-icon">Twitter</button>
                <button className="social-icon">Facebook</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Interview Prep AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
