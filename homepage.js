import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Users, 
  Clock,
  Calendar,
  FileText,
  Award,
  Video,
  MessageSquare,
  TrendingUp,
  Activity
} from 'lucide-react';

const HomePage = () => {
  const [activeGroup, setActiveGroup] = useState('cardiology');

  const studyGroups = [
    {
      id: 'cardiology',
      name: 'Cardiology Team',
      members: ['Ahmed', 'Sara', 'Ibrar'],
      topic: 'Heart Failure Management',
      progress: 75,
      color: '#E91E63',
      icon: Heart
    },
    {
      id: 'neurology',
      name: 'Neuro Club',
      members: ['Fatima', 'Ali', 'Ibrar'],
      topic: 'Stroke Protocols',
      progress: 60,
      color: '#7E57C2',
      icon: Brain
    },
    {
      id: 'pharmacology',
      name: 'Pharma Group',
      members: ['Omar', 'Layla', 'Ibrar'],
      topic: 'Antibiotic Classes',
      progress: 90,
      color: '#29B6F6',
      icon: BookOpen
    }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Cardiology Case Study', due: 'Tomorrow', priority: 'high' },
    { id: 2, title: 'Neuroanatomy Quiz', due: 'In 2 days', priority: 'medium' },
    { id: 3, title: 'Pharma Assignment', due: 'In 3 days', priority: 'low' },
    { id: 4, title: 'Pathology Lab Report', due: 'Next Week', priority: 'medium' }
  ];

  const medicalStats = [
    { label: 'Study Hours', value: '42', icon: Clock, color: '#E91E63' },
    { label: 'Assignments', value: '8', icon: FileText, color: '#7E57C2' },
    { label: 'Case Studies', value: '12', icon: BookOpen, color: '#29B6F6' },
    { label: 'Quiz Score', value: '94%', icon: Award, color: '#66BB6A' }
  ];

  return (
    <div className="home-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome to <span className="highlight">MedStudy Hub</span>
          </h1>
          <p className="welcome-subtitle">
            Collaborative platform for medical students. Study smarter, heal better.
          </p>
          <div className="welcome-actions">
            <Link to="/dissection-room" className="medical-btn">
              <Video size={20} />
              Join Study Room
            </Link>
            <Link to="/assignments" className="medical-btn-outline">
              <FileText size={20} />
              View Assignments
            </Link>
          </div>
        </div>
        <div className="welcome-graphics">
          <div className="medical-animation">
            <Heart className="pulse-animation" />
            <Brain className="float-animation" />
            <Activity className="rotate-animation" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {medicalStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
              <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                <Icon color={stat.color} size={24} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className="stat-trend">
                <TrendingUp size={16} />
                <span>+12%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Study Groups */}
        <div className="card study-groups">
          <div className="card-header">
            <h2 className="card-title">
              <Users size={24} />
              Active Study Groups
            </h2>
            <Link to="/" className="view-all">View All →</Link>
          </div>
          <div className="groups-list">
            {studyGroups.map(group => {
              const Icon = group.icon;
              return (
                <div 
                  key={group.id}
                  className={`group-item ${activeGroup === group.id ? 'active' : ''}`}
                  onClick={() => setActiveGroup(group.id)}
                  style={{ borderColor: group.color }}
                >
                  <div className="group-header">
                    <div className="group-icon" style={{ background: group.color }}>
                      <Icon size={20} color="white" />
                    </div>
                    <div className="group-info">
                      <h4 className="group-name">{group.name}</h4>
                      <p className="group-topic">{group.topic}</p>
                    </div>
                    <div className="group-members">
                      {group.members.map((member, idx) => (
                        <div key={idx} className="member-avatar" style={{ left: idx * 15 }}>
                          {member.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="group-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${group.progress}%`,
                          background: group.color
                        }}
                      />
                    </div>
                    <span className="progress-text">{group.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="create-group-btn">
            <Users size={20} />
            Create New Group
          </button>
        </div>

        {/* Upcoming Tasks */}
        <div className="card upcoming-tasks">
          <div className="card-header">
            <h2 className="card-title">
              <Calendar size={24} />
              Upcoming Tasks
            </h2>
            <Link to="/assignments" className="view-all">View All →</Link>
          </div>
          <div className="tasks-list">
            {upcomingTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className={`task-priority ${task.priority}`} />
                <div className="task-content">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-due">Due: {task.due}</p>
                </div>
                <div className="task-actions">
                  <button className="action-btn" title="Start">
                    <Clock size={18} />
                  </button>
                  <button className="action-btn" title="Discuss">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="task-stats">
            <div className="stat">
              <span className="stat-label">High Priority</span>
              <span className="stat-value">1</span>
            </div>
            <div className="stat">
              <span className="stat-label">Medium</span>
              <span className="stat-value">2</span>
            </div>
            <div className="stat">
              <span className="stat-label">Low</span>
              <span className="stat-value">1</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <Link to="/dissection-room" className="action-card">
              <div className="action-icon video">
                <Video size={24} />
              </div>
              <h4>Virtual Study Room</h4>
              <p>Join live session</p>
            </Link>
            <Link to="/assignments" className="action-card">
              <div className="action-icon assignment">
                <FileText size={24} />
              </div>
              <h4>Submit Assignment</h4>
              <p>Upload your work</p>
            </Link>
            <Link to="/resources" className="action-card">
              <div className="action-icon resources">
                <BookOpen size={24} />
              </div>
              <h4>Medical Resources</h4>
              <p>Access library</p>
            </Link>
            <Link to="/" className="action-card">
              <div className="action-icon quiz">
                <Award size={24} />
              </div>
              <h4>Take Quiz</h4>
              <p>Test your knowledge</p>
            </Link>
          </div>
        </div>

        {/* Study Progress */}
        <div className="card study-progress">
          <div className="card-header">
            <h2 className="card-title">Weekly Study Progress</h2>
          </div>
          <div className="progress-chart">
            {/* Simplified chart - you can replace with actual chart library */}
            <div className="chart-bars">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{ 
                      height: `${30 + Math.random() * 70}%`,
                      background: `linear-gradient(to top, #E91E63, #7E57C2)`
                    }}
                  />
                  <span className="chart-label">{day}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="progress-summary">
            <div className="summary-item">
              <span className="summary-label">Total Hours</span>
              <span className="summary-value">12.5h</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Focus Score</span>
              <span className="summary-value">88%</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Group Sessions</span>
              <span className="summary-value">7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="developer-footer">
        <p>MedStudy Hub v1.0 • Designed specifically for medical students • Developed by Ibrar</p>
      </div>

      <style jsx>{`
        .home-page {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .welcome-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, var(--white), var(--light-pink));
          border-radius: var(--border-radius-lg);
          padding: 40px;
          margin-bottom: 30px;
          border: 2px solid var(--soft-pink);
        }

        .welcome-content {
          flex: 1;
        }

        .welcome-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--gray-900);
          margin-bottom: 16px;
        }

        .highlight {
          color: var(--medical-pink);
          background: linear-gradient(135deg, var(--medical-pink), var(--anatomy-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .welcome-subtitle {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--gray-800);
          margin-bottom: 32px;
          max-width: 600px;
        }

        .welcome-actions {
          display: flex;
          gap: 20px;
        }

        .medical-btn, .medical-btn-outline {
          text-decoration: none;
        }

        .welcome-graphics {
          flex: 0 0 200px;
          position: relative;
        }

        .medical-animation {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .medical-animation svg {
          position: absolute;
          color: var(--medical-pink);
          opacity: 0.7;
        }

        .pulse-animation {
          top: 20%;
          left: 20%;
          animation: pulse 2s infinite;
        }

        .float-animation {
          top: 50%;
          right: 20%;
          animation: float 3s infinite;
        }

        .rotate-animation {
          bottom: 20%;
          left: 40%;
          animation: rotate 4s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-top: 4px solid;
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: var(--gray-900);
        }

        .stat-label {
          font-family: var(--font-body);
          color: var(--gray-800);
          margin: 4px 0 0 0;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--ecg-green);
          font-weight: 600;
        }

        .main-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        .card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: var(--shadow-md);
          border-left: 6px solid var(--medical-pink);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--gray-900);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .view-all {
          text-decoration: none;
          color: var(--medical-pink);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .view-all:hover {
          transform: translateX(5px);
        }

        .groups-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .group-item {
          padding: 20px;
          border-radius: var(--border-radius);
          border: 2px solid;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .group-item:hover, .group-item.active {
          transform: translateX(5px);
          box-shadow: var(--shadow-lg);
        }

        .group-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .group-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .group-info {
          flex: 1;
        }

        .group-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          margin: 0 0 4px 0;
          color: var(--gray-900);
        }

        .group-topic {
          font-family: var(--font-body);
          color: var(--gray-800);
          margin: 0;
          font-size: 0.9rem;
        }

        .group-members {
          display: flex;
          position: relative;
          width: 60px;
          height: 36px;
        }

        .member-avatar {
          position: absolute;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--stethoscope-blue), var(--anatomy-purple));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          border: 2px solid white;
        }

        .group-progress {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: var(--gray-100);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }

        .progress-text {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--gray-800);
        }

        .create-group-btn {
          width: 100%;
          padding: 16px;
          background: var(--gray-50);
          border: 2px dashed var(--medical-pink);
          border-radius: var(--border-radius);
          color: var(--medical-pink);
          font-family: var(--font-heading);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .create-group-btn:hover {
          background: var(--light-pink);
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--gray-50);
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
        }

        .task-item:hover {
          transform: translateX(5px);
          background: var(--light-pink);
        }

        .task-priority {
          width: 8px;
          height: 40px;
          border-radius: 4px;
        }

        .task-priority.high {
          background: #E91E63;
        }

        .task-priority.medium {
          background: #FF9800;
        }

        .task-priority.low {
          background: #66BB6A;
        }

        .task-content {
          flex: 1;
        }

        .task-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          margin: 0 0 4px 0;
          color: var(--gray-900);
        }

        .task-due {
          font-family: var(--font-body);
          color: var(--gray-800);
          margin: 0;
          font-size: 0.9rem;
        }

        .task-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--soft-pink);
          color: var(--medical-pink);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: var(--medical-pink);
          color: white;
        }

        .task-stats {
          display: flex;
          gap: 24px;
          padding-top: 16px;
          border-top: 2px solid var(--soft-pink);
        }

        .stat {
          flex: 1;
          text-align: center;
        }

        .stat-label {
          display: block;
          font-family: var(--font-body);
          color: var(--gray-800);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .stat-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .action-card {
          text-decoration: none;
          color: inherit;
          padding: 24px;
          border-radius: var(--border-radius);
          background: var(--gray-50);
          transition: all 0.3s ease;
          text-align: center;
        }

        .action-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          background: var(--light-pink);
        }

        .action-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-icon.video {
          background: rgba(233, 30, 99, 0.1);
          color: var(--medical-pink);
        }

        .action-icon.assignment {
          background: rgba(126, 87, 194, 0.1);
          color: var(--anatomy-purple);
        }

        .action-icon.resources {
          background: rgba(41, 182, 246, 0.1);
          color: var(--stethoscope-blue);
        }

        .action-icon.quiz {
          background: rgba(102, 187, 106, 0.1);
          color: var(--ecg-green);
        }

        .action-card h4 {
          font-family: var(--font-heading);
          margin: 0 0 8px 0;
          color: var(--gray-900);
        }

        .action-card p {
          font-family: var(--font-body);
          color: var(--gray-800);
          margin: 0;
          font-size: 0.9rem;
        }

        .progress-chart {
          margin-bottom: 24px;
        }

        .chart-bars {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 200px;
          padding: 0 20px;
        }

        .chart-bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .chart-bar {
          width: 30px;
          border-radius: 6px 6px 0 0;
          transition: height 0.5s ease;
        }

        .chart-label {
          font-family: var(--font-body);
          color: var(--gray-800);
          font-size: 0.9rem;
        }

        .progress-summary {
          display: flex;
          gap: 20px;
          padding-top: 20px;
          border-top: 2px solid var(--soft-pink);
        }

        .summary-item {
          flex: 1;
          text-align: center;
        }

        .summary-label {
          display: block;
          font-family: var(--font-body);
          color: var(--gray-800);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .summary-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--medical-pink);
        }

        .developer-footer {
          text-align: center;
          padding: 20px;
          margin-top: 40px;
          border-top: 2px solid var(--soft-pink);
          color: var(--gray-800);
          font-family: var(--font-body);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .home-page {
            padding: 16px;
          }

          .welcome-section {
            flex-direction: column;
            text-align: center;
            padding: 30px 20px;
          }

          .welcome-actions {
            flex-direction: column;
          }

          .welcome-graphics {
            margin-top: 30px;
          }

          .main-grid {
            gap: 20px;
          }

          .card {
            padding: 20px;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;