import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Menu, 
  X, 
  Bell, 
  Search,
  User
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const medicalSystems = [
    { name: 'Cardiology', color: '#E91E63' },
    { name: 'Neurology', color: '#7E57C2' },
    { name: 'Pulmonology', color: '#29B6F6' },
    { name: 'Gastroenterology', color: '#66BB6A' },
    { name: 'Orthopedics', color: '#FF9800' },
  ];

  return (
    <nav className="medical-navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <Stethoscope className="logo-icon" size={32} />
            <div className="logo-text">
              <h1 className="logo-title">MedStudy Hub</h1>
              <p className="logo-subtitle">Medical Students Collaboration</p>
            </div>
          </Link>
          <div className="developer-tag-nav">
            <span className="developer-badge">Developed by Ibrar</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search medical topics, drugs, or cases..." 
              className="search-input"
            />
            <select className="search-filter">
              <option value="all">All</option>
              <option value="anatomy">Anatomy</option>
              <option value="pharma">Pharmacology</option>
              <option value="patho">Pathology</option>
              <option value="cases">Case Studies</option>
            </select>
          </div>
        </div>

        {/* Navigation Items */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {medicalSystems.map((system, index) => (
            <Link 
              key={index} 
              to={`/system/${system.name.toLowerCase()}`}
              className="nav-link"
              style={{ '--system-color': system.color }}
            >
              <span className="system-dot" style={{ backgroundColor: system.color }} />
              {system.name}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          <button className="notification-btn">
            <Bell size={22} />
            <span className="notification-count">3</span>
          </button>
          
          <div className="user-profile">
            <button 
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="profile-avatar">
                <User size={20} />
              </div>
              <span>Medical Student</span>
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <h4>Medical Student</h4>
                  <p>Year 2 | Cardiology Focus</p>
                </div>
                <div className="profile-menu">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <Link to="/help">Medical Resources</Link>
                  <button className="logout-btn">Logout</button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ECG Line */}
      <div className="ecg-line" />

      <style jsx>{`
        .medical-navbar {
          background: linear-gradient(135deg, var(--white) 0%, #f8f9fa 100%);
          border-bottom: 3px solid var(--medical-pink);
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }

        .logo-icon {
          color: var(--medical-pink);
          background: var(--light-pink);
          padding: 8px;
          border-radius: 12px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--deep-pink);
          margin: 0;
          line-height: 1.2;
        }

        .logo-subtitle {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--gray-800);
          margin: 0;
          opacity: 0.8;
        }

        .developer-tag-nav {
          background: linear-gradient(135deg, var(--medical-pink), var(--anatomy-purple));
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .navbar-search {
          flex: 1;
          max-width: 400px;
          margin: 0 24px;
        }

        .search-container {
          display: flex;
          background: var(--gray-50);
          border-radius: var(--border-radius);
          overflow: hidden;
          border: 2px solid var(--soft-pink);
        }

        .search-icon {
          color: var(--medical-pink);
          margin: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
        }

        .search-filter {
          border: none;
          background: var(--soft-pink);
          padding: 0 16px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--deep-pink);
          cursor: pointer;
        }

        .navbar-links {
          display: flex;
          gap: 4px;
        }

        .nav-link {
          text-decoration: none;
          color: var(--gray-800);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background: var(--light-pink);
          color: var(--medical-pink);
          transform: translateY(-2px);
        }

        .system-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--system-color);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-800);
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .notification-btn:hover {
          background: var(--light-pink);
          color: var(--medical-pink);
        }

        .notification-count {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--ecg-green);
          color: white;
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-profile {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-800);
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .profile-btn:hover {
          background: var(--light-pink);
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--medical-pink), var(--anatomy-purple));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          width: 280px;
          padding: 20px;
          margin-top: 10px;
          border: 2px solid var(--soft-pink);
        }

        .profile-info {
          text-align: center;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--soft-pink);
          margin-bottom: 16px;
        }

        .profile-info h4 {
          margin: 0 0 4px 0;
          color: var(--deep-pink);
          font-family: var(--font-heading);
        }

        .profile-info p {
          margin: 0;
          color: var(--gray-800);
          font-size: 0.9rem;
        }

        .profile-menu {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .profile-menu a {
          text-decoration: none;
          color: var(--gray-800);
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }

        .profile-menu a:hover {
          background: var(--light-pink);
          color: var(--medical-pink);
          padding-left: 20px;
        }

        .logout-btn {
          background: none;
          border: 2px solid var(--medical-pink);
          color: var(--medical-pink);
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 600;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .logout-btn:hover {
          background: var(--medical-pink);
          color: white;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--gray-800);
          cursor: pointer;
          padding: 8px;
        }

        .ecg-line {
          height: 3px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--medical-pink) 20%, 
            var(--stethoscope-blue) 40%, 
            var(--ecg-green) 60%, 
            var(--anatomy-purple) 80%, 
            transparent 100%
          );
          animation: ecg-beat 2s infinite;
        }

        @media (max-width: 1200px) {
          .navbar-links {
            display: none;
          }
          
          .navbar-search {
            max-width: 300px;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 16px;
          }
          
          .navbar-search {
            display: none;
          }
          
          .developer-tag-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;