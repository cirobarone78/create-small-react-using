import { useState, useEffect } from 'react';

function DashboardCard({ title, value, change, trend, icon, color }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState('0');

  useEffect(() => {
    setIsVisible(true);
    
    // Animate the value if it's a number
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      const duration = 1000;
      const steps = 30;
      const stepValue = numericValue / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          const current = stepValue * currentStep;
          if (value.includes('$')) {
            setAnimatedValue(`$${current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
          } else if (value.includes('%')) {
            setAnimatedValue(`${current.toFixed(1)}%`);
          } else {
            setAnimatedValue(Math.floor(current).toLocaleString());
          }
        } else {
          setAnimatedValue(value);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value]);

  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'card-blue';
      case 'green':
        return 'card-green';
      case 'purple':
        return 'card-purple';
      case 'orange':
        return 'card-orange';
      default:
        return 'card-blue';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    );
  };

  return (
    <div className={`dashboard-card ${getColorClass()} ${isVisible ? 'card-visible' : ''}`}>
      <div className="card-header">
        <div className="card-icon-wrapper">
          <span className="card-icon">{icon}</span>
        </div>
        <div className="card-trend">
          <span className={`trend-badge trend-${trend}`}>
            {getTrendIcon()}
            {change}
          </span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="card-value">{animatedValue}</div>
      </div>
      <div className="card-footer">
        <span className="card-footer-text">vs last month</span>
      </div>
    </div>
  );
}

export default DashboardCard;