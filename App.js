import React, { useState, useEffect, useRef } from 'react';
import './styles/main.css';
import './styles/medical-theme.css';
import { io } from 'socket.io-client';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(3);
  const [studyTime, setStudyTime] = useState(0);
  const socketRef = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket'],
      withCredentials: true
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    socketRef.current.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('assignment-added', (assignment) => {
      setAssignments(prev => [...prev, assignment]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Timer for study session
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        text: newMessage,
        user: 'You',
        timestamp: new Date().toLocaleTimeString(),
        avatarColor: '#E91E63'
      };
      
      socketRef.current.emit('send-message', {
        ...message,
        roomId: 'medical-group'
      });
      
      setNewMessage('');
    }
  };

  const handleAddAssignment = () => {
    if (newAssignment.title.trim()) {
      const assignment = {
        id: Date.now(),
        ...newAssignment,
        createdAt: new Date().toISOString(),
        completed: false,
        submittedBy: 'Ibrar',
        color: '#E91E63'
      };
      
      if (socketRef.current) {
        socketRef.current.emit('add-assignment', assignment);
      }
      
      setAssignments([...assignments, assignment]);
      setNewAssignment({ title: '', description: '', dueDate: '' });
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          alert(`${selectedFile.name} uploaded successfully!`);
          setFile(null);
          setUploadProgress(0);
        }, 500);
      }
    }, 200);
  };

  const startStudySession = () => {
    if (socketRef.current) {
      socketRef.current.emit('start-study-session', {
        host: 'Ibrar',
        topic: 'Cardiology Review',
        duration: 60
      });
      alert('Study session started! Your friends will be notified.');
    }
  };

  // Dashboard Statistics
  const stats = [
    { label: 'Study Hours', value: '42.5', unit: 'hrs', icon: '⏰', color: '#E91E63', trend: '+12%' },
    { label: 'Assignments', value: '8', unit: 'tasks', icon: '📝', color: '#7E57C2', trend: '+3' },
    { label: 'Group Sessions', value: '15', unit: 'sessions', icon: '👥', color: '#29B6F6', trend: '+5' },
    { label: 'Resources Shared', value: '23', unit: 'files', icon: '📚', color: '#66BB6A', trend: '+8' }
  ];

  // Recent Activities
  const activities = [
    { user: 'Dr.Shimaa', action: 'submitted Cardiology case study', time: '10 min ago', color: '#29B6F6' },
    { user: 'Menna', action: 'shared Neuroanatomy notes', time: '25 min ago', color: '#7E57C2' },
    { user: 'Ibrar', action: 'started a study session', time: '1 hour ago', color: '#E91E63' },
    { user: 'Hina', action: 'completed Pharmacology quiz', time: '2 hours ago', color: '#29B6F6' }
  ];

  return (
    <div className="app-container medical-professional">
      {/* Professional Header */}
      <header className="ecg-header">
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '2.5rem',
              margin: '0 0 10px 0',
              fontWeight: '800',
              letterSpacing: '-0.5px'
            }}>
              <span style={{ 
                background: 'white',
                color: '#E91E63',
                padding: '0 15px',
                borderRadius: '15px',
                marginRight: '10px'
              }}>👨‍⚕️</span>
              MedStudy Hub
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              opacity: '0.9',
              marginBottom: '5px'
            }}>
              Professional Medical Education Platform
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <span className="med-badge">
                <span className="status-indicator status-online">
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    background: '#66BB6A', 
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></span>
                  {onlineUsers} Online
                </span>
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '6px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)'
              }}>
                Version 2.0
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '6px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)',
                fontWeight: '600'
              }}>
                Developed by Ibrar
              </span>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #fff, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {Math.floor(studyTime / 3600).toString().padStart(2, '0')}:
              {Math.floor((studyTime % 3600) / 60).toString().padStart(2, '0')}:
              {(studyTime % 60).toString().padStart(2, '0')}
            </div>
            <p style={{ margin: '5px 0 0 0', opacity: '0.8' }}>Total Study Time</p>
          </div>
        </div>
      </header>

      {/* Professional Navigation */}
      <nav style={{
        background: 'white',
        padding: '0 30px',
        borderBottom: '2px solid rgba(233, 30, 99, 0.1)',
        position: 'sticky',
        top: '0',
        zIndex: '100',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '5px',
          overflowX: 'auto',
          padding: '15px 0'
        }}>
          {['dashboard', 'study', 'assignments', 'resources', 'chat', 'files', 'schedule', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'linear-gradient(135deg, #E91E63, #C2185B)' : 'transparent',
                color: activeTab === tab ? 'white' : '#666',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {tab === 'dashboard' && '📊'}
              {tab === 'study' && '🎓'}
              {tab === 'assignments' && '📝'}
              {tab === 'resources' && '📚'}
              {tab === 'chat' && '💬'}
              {tab === 'files' && '📎'}
              {tab === 'schedule' && '📅'}
              {tab === 'analytics' && '📈'}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '30px auto',
        padding: '0 20px'
      }}>
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Overview */}
            <div className="dashboard-grid">
              {stats.map((stat, index) => (
                <div key={index} className="dashboard-stat">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: '700',
                        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: '1'
                      }}>
                        {stat.value}
                        <span style={{ 
                          fontSize: '1.5rem',
                          color: '#666',
                          marginLeft: '5px'
                        }}>{stat.unit}</span>
                      </div>
                      <div style={{ 
                        fontSize: '1rem', 
                        color: '#666',
                        marginTop: '10px'
                      }}>{stat.label}</div>
                    </div>
                    <div style={{ 
                      fontSize: '2.5rem',
                      color: stat.color,
                      opacity: '0.8'
                    }}>{stat.icon}</div>
                  </div>
                  <div style={{ 
                    marginTop: '15px',
                    color: stat.color,
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    ↑ {stat.trend} this week
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="med-card" style={{ marginTop: '30px' }}>
              <div className="med-card-header">
                <h2 className="med-card-title">
                  <span style={{ fontSize: '1.5rem' }}>📈</span>
                  Recent Activity
                </h2>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  background: '#f5f5f5',
                  padding: '5px 15px',
                  borderRadius: '15px'
                }}>
                  Last 24 hours
                </span>
              </div>
              
              <div className="med-timeline">
                {activities.map((activity, index) => (
                  <div key={index} className="timeline-item">
                    <div style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '15px',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: activity.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '1.1rem'
                        }}>
                          {activity.user.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', color: '#333' }}>
                            {activity.user} <span style={{ fontWeight: '400', color: '#666' }}>
                              {activity.action}
                            </span>
                          </div>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#888',
                            marginTop: '5px'
                          }}>
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="med-card">
            <div className="med-card-header">
              <h2 className="med-card-title">
                <span style={{ fontSize: '1.5rem' }}>🎓</span>
                Virtual Study Room
              </h2>
              <button 
                onClick={startStudySession}
                style={{
                  background: 'linear-gradient(135deg, #E91E63, #C2185B)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)'
                }}
              >
                🚀 Start Session
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginTop: '20px'
            }}>
              {/* Video Conference Area */}
              <div style={{
                background: '#1a1a1a',
                borderRadius: '15px',
                overflow: 'hidden',
                height: '400px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  background: '#2a2a2a',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <div style={{ fontSize: '5rem' }}>👨‍⚕️👩‍⚕️</div>
                  <div>Video Room: Cardiology Review</div>
                  <div style={{ 
                    background: 'rgba(233, 30, 99, 0.2)',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    border: '1px solid rgba(233, 30, 99, 0.3)'
                  }}>
                    Join URL: medstudy-hub.com/room/cardio123
                  </div>
                </div>
              </div>

              {/* Study Tools */}
              <div>
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Study Tools</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px'
                }}>
                  {[
                    { icon: '📝', label: 'Shared Whiteboard', color: '#29B6F6' },
                    { icon: '📊', label: 'Medical Diagrams', color: '#7E57C2' },
                    { icon: '⏰', label: 'Pomodoro Timer', color: '#E91E63' },
                    { icon: '🎯', label: 'Quiz Maker', color: '#66BB6A' },
                    { icon: '📚', label: 'Resource Library', color: '#FF9800' },
                    { icon: '🎥', label: 'Screen Share', color: '#9C27B0' }
                  ].map((tool, index) => (
                    <button
                      key={index}
                      onClick={() => alert(`${tool.label} activated!`)}
                      style={{
                        background: 'white',
                        border: `2px solid ${tool.color}20`,
                        padding: '20px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = `0 10px 20px ${tool.color}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ 
                        fontSize: '2rem',
                        marginBottom: '10px',
                        color: tool.color
                      }}>
                        {tool.icon}
                      </div>
                      <div style={{ 
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#333'
                      }}>
                        {tool.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="med-card">
            <div className="med-card-header">
              <h2 className="med-card-title">
                <span style={{ fontSize: '1.5rem' }}>📝</span>
                Medical Assignments
              </h2>
              <div style={{ 
                background: 'linear-gradient(135deg, #66BB6A, #388E3C)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                {assignments.filter(a => a.completed).length}/{assignments.length} Completed
              </div>
            </div>

            {/* Add Assignment Form */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05), rgba(126, 87, 194, 0.05))',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px dashed rgba(233, 30, 99, 0.2)'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Add New Assignment</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Assignment Title (e.g., Cardiology Case Study)"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  style={{
                    padding: '15px',
                    borderRadius: '10px',
                    border: '2px solid rgba(233, 30, 99, 0.2)',
                    fontSize: '1rem',
                    background: 'white'
                  }}
                />
                <textarea
                  placeholder="Description (include medical details, requirements, etc.)"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  rows="3"
                  style={{
                    padding: '15px',
                    borderRadius: '10px',
                    border: '2px solid rgba(233, 30, 99, 0.2)',
                    fontSize: '1rem',
                    background: 'white',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    style={{
                      flex: 1,
                      padding: '15px',
                      borderRadius: '10px',
                      border: '2px solid rgba(233, 30, 99, 0.2)',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  />
                  <button
                    onClick={handleAddAssignment}
                    style={{
                      background: 'linear-gradient(135deg, #E91E63, #C2185B)',
                      color: 'white',
                      border: 'none',
                      padding: '15px 30px',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}
                  >
                    Add Assignment
                  </button>
                </div>
              </div>
            </div>

            {/* Assignments List */}
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Current Assignments</h3>
              {assignments.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '50px',
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '15px',
                  border: '2px dashed rgba(0, 0, 0, 0.1)',
                  color: '#666'
                }}>
                  No assignments yet. Add your first medical assignment above!
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  {assignments.map((assignment, index) => (
                    <div
                      key={index}
                      style={{
                        background: assignment.completed ? 'linear-gradient(135deg, rgba(102, 187, 106, 0.1), white)' : 'white',
                        padding: '25px',
                        borderRadius: '15px',
                        borderLeft: `6px solid ${assignment.color || '#E91E63'}`,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '15px',
                          marginBottom: '10px'
                        }}>
                          <h4 style={{ 
                            margin: 0, 
                            color: assignment.completed ? '#2E7D32' : '#333',
                            fontSize: '1.1rem'
                          }}>
                            {assignment.title}
                          </h4>
                          <span style={{
                            background: assignment.completed ? '#66BB6A' : '#FF9800',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {assignment.completed ? '✅ Completed' : '⏳ Pending'}
                          </span>
                        </div>
                        {assignment.description && (
                          <p style={{ 
                            margin: '10px 0', 
                            color: '#666',
                            fontSize: '0.95rem'
                          }}>
                            {assignment.description}
                          </p>
                        )}
                        <div style={{ 
                          display: 'flex', 
                          gap: '20px', 
                          marginTop: '15px',
                          fontSize: '0.9rem',
                          color: '#888'
                        }}>
                          <span>📅 Due: {assignment.dueDate || 'No deadline'}</span>
                          <span>👤 By: {assignment.submittedBy || 'Ibrar'}</span>
                          <span>📌 Medical</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => {
                            const updated = [...assignments];
                            updated[index].completed = !updated[index].completed;
                            setAssignments(updated);
                          }}
                          style={{
                            background: assignment.completed ? '#FF9800' : '#66BB6A',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {assignment.completed ? 'Mark Pending' : 'Mark Complete'}
                        </button>
                        <button
                          onClick={() => alert(`Sharing "${assignment.title}" with your study group`)}
                          style={{
                            background: '#29B6F6',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="med-card">
            <div className="med-card-header">
              <h2 className="med-card-title">
                <span style={{ fontSize: '1.5rem' }}>💬</span>
                Medical Study Chat
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="status-indicator status-online">
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    background: '#66BB6A', 
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></span>
                  Active Now
                </span>
                <div style={{
                  display: 'flex',
                  marginLeft: '10px'
                }}>
                  {['I', 'A', 'S'].map((letter, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        background: idx === 0 ? '#E91E63' : idx === 1 ? '#29B6F6' : '#7E57C2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        border: '3px solid white',
                        marginLeft: idx > 0 ? '-10px' : '0',
                        boxShadow: '0 0 0 2px rgba(233, 30, 99, 0.1)'
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              height: '500px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Messages Container */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '15px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {messages.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '50px',
                    color: '#666'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👨‍⚕️👩‍⚕️</div>
                    <h3>Start your medical discussion!</h3>
                    <p>Ask questions, share insights, or discuss case studies with your study group.</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        maxWidth: '80%',
                        alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start',
                        background: msg.user === 'You' ? 'linear-gradient(135deg, #E91E63, #C2185B)' : 'white',
                        color: msg.user === 'You' ? 'white' : '#333',
                        padding: '15px',
                        borderRadius: msg.user === 'You' ? '15px 15px 5px 15px' : '15px 15px 15px 5px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: msg.avatarColor || (msg.user === 'You' ? '#E91E63' : '#29B6F6'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {msg.user.charAt(0)}
                        </div>
                        <div style={{ 
                          fontWeight: '600',
                          fontSize: '0.95rem'
                        }}>
                          {msg.user}
                        </div>
                        <div style={{ 
                          fontSize: '0.8rem',
                          opacity: '0.8',
                          marginLeft: 'auto'
                        }}>
                          {msg.timestamp}
                        </div>
                      </div>
                      <div style={{ fontSize: '1rem' }}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your medical question or insight..."
                    style={{
                      width: '100%',
                      padding: '15px 20px 15px 50px',
                      borderRadius: '12px',
                      border: '2px solid rgba(233, 30, 99, 0.2)',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#E91E63',
                    fontSize: '1.2rem'
                  }}>
                    💬
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  style={{
                    background: newMessage.trim() ? 'linear-gradient(135deg, #E91E63, #C2185B)' : '#ccc',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    minWidth: '100px'
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="med-card">
            <div className="med-card-header">
              <h2 className="med-card-title">
                <span style={{ fontSize: '1.5rem' }}>📎</span>
                Medical Resource Library
              </h2>
            </div>

            <div className="med-upload" onClick={() => document.getElementById('file-upload').click()}>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.mp4"
              />
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                {file ? '📤' : '📎'}
              </div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>
                {file ? `Uploading: ${file.name}` : 'Upload Medical Resources'}
              </h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Share PDFs, images, videos, or documents with your study group
              </p>
              
              {file && (
                <div style={{
                  width: '100%',
                  background: 'rgba(233, 30, 99, 0.1)',
                  borderRadius: '10px',
                  height: '10px',
                  margin: '20px 0'
                }}>
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(135deg, #E91E63, #C2185B)',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              )}
              
              <button
                style={{
                  background: 'white',
                  color: '#E91E63',
                  border: '2px solid #E91E63',
                  padding: '12px 25px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                {file ? `Uploading ${uploadProgress}%` : 'Select File'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Professional Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #263238, #37474F)',
        color: 'white',
        padding: '50px 20px 30px',
        marginTop: '50px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <h3 style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: '#E91E63'
            }}>
              🩺 MedStudy Hub
            </h3>
            <p style={{ opacity: '0.8', lineHeight: '1.6' }}>
              Professional collaboration platform for medical students worldwide.
              Share knowledge, accelerate learning, and build your medical career.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '20px', color: '#E91E63' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Study Rooms</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Assignment Tracker</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Resource Library</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Medical Flashcards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '20px', color: '#E91E63' }}>Medical Resources</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Anatomy Atlas</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Drug Database</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Case Studies</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Medical Journals</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '20px', color: '#E91E63' }}>Contact</h4>
            <p style={{ opacity: '0.8', marginBottom: '10px' }}>
              <strong>Developer:</strong> Ibrar
            </p>
            <p style={{ opacity: '0.8', marginBottom: '10px' }}>
              <strong>Version:</strong> 2.0 Professional
            </p>
            <p style={{ opacity: '0.8', marginBottom: '10px' }}>
              <strong>Specialization:</strong> Medical Education Technology
            </p>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '30px',
          textAlign: 'center',
          opacity: '0.7'
        }}>
          <p>© 2024 MedStudy Hub. All rights reserved. Designed for medical students worldwide.</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            This platform is developed by Ibrar for educational purposes.
            Always verify medical information with licensed professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;