import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    revenue: 0,
    orders: 0,
    growth: 0
  });

  useEffect(() => {
    // Simulate loading data with animation
    const timer = setTimeout(() => {
      setStats({
        users: 12847,
        revenue: 94532.50,
        orders: 3421,
        growth: 23.5
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const dashboardData = [
    {
      title: 'Total Users',
      value: stats.users.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+8.2%',
      trend: 'up',
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Orders',
      value: stats.orders.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: '📦',
      color: 'purple'
    },
    {
      title: 'Growth Rate',
      value: `${stats.growth}%`,
      change: '+3.1%',
      trend: 'up',
      icon: '📈',
      color: 'orange'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Dashboard Overview</h1>
              <p className="subtitle">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="dashboard-grid">
              {dashboardData.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  change={card.change}
                  trend={card.trend}
                  icon={card.icon}
                  color={card.color}
                />
              ))}
            </div>
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">🔔</div>
                  <div className="activity-details">
                    <h3>New user registration</h3>
                    <p>Sarah Johnson joined 5 minutes ago</p>
                  </div>
                  <span className="activity-time">5m ago</span>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💳</div>
                  <div className="activity-details">
                    <h3>Payment received</h3>
                    <p>Order #4521 - $249.99</p>
                  </div>
                  <span className="activity-time">12m ago</span>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📊</div>
                  <div className="activity-details">
                    <h3>Report generated</h3>
                    <p>Monthly sales report is ready</p>
                  </div>
                  <span className="activity-time">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Analytics</h1>
              <p className="subtitle">Detailed insights and metrics</p>
            </div>
            <div className="placeholder-content">
              <div className="placeholder-icon">📊</div>
              <h2>Analytics Dashboard</h2>
              <p>View detailed charts, graphs, and performance metrics here.</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Reports</h1>
              <p className="subtitle">Generate and view reports</p>
            </div>
            <div className="placeholder-content">
              <div className="placeholder-icon">📄</div>
              <h2>Reports Center</h2>
              <p>Access all your generated reports and create new ones.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Settings</h1>
              <p className="subtitle">Manage your preferences</p>
            </div>
            <div className="placeholder-content">
              <div className="placeholder-icon">⚙️</div>
              <h2>Settings Panel</h2>
              <p>Configure your dashboard preferences and account settings.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header onMenuClick={toggleSidebar} />
      <div className="app-container">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;