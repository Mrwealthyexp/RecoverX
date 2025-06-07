// src/components/Routerdashboard.jsx import React from 'react'; import '../styles/Routerdashboard.css';

const Routerdashboard = () => { return ( <div className="router-dashboard"> <h2 className="router-title">Router Dashboard</h2> <div className="router-status"> <div className="router-box"> <span className="label">Router Address:</span> <span className="value">0x123...abc</span> </div> <div className="router-box"> <span className="label">Status:</span> <span className="value online">Online</span> </div> <div className="router-box"> <span className="label">Synced Blocks:</span> <span className="value">137,941</span> </div> </div> </div> ); };

export default Routerdashboard;

// src/components/Smartmonitor.jsx import React from 'react'; import '../styles/Smartmonitor.css';

const Smartmonitor = () => { return ( <div className="smart-monitor"> <h2 className="monitor-title">Smart Contract Monitor</h2> <div className="monitor-content"> <div className="monitor-box"> <span className="label">Contract Address:</span> <span className="value">0xABC1234567890DEF1234567890ABCDEF12345678</span> </div> <div className="monitor-box"> <span className="label">Events Tracked:</span> <span className="value">Last 50 Events</span> </div> <div className="monitor-box"> <span className="label">Status:</span> <span className="value active">Active</span> </div> </div> </div> ); };

export default Smartmonitor;

