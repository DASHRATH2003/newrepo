import React, { useState } from 'react';
import config from '../config';

/**
 * DevTools component for development environment
 * Provides tools for developers to test different configurations
 */
const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [backendUrl] = useState(config.API_BASE_URL || 'Not set');
  const [useProduction, setUseProduction] = useState(
    typeof localStorage !== 'undefined' && localStorage.getItem('useProductionBackend') !== 'false'
  );

  // Only render in development environment
  const shouldRender = process.env.NODE_ENV === 'development' || window.location.hostname.includes('localhost');

  if (!shouldRender) {
    return null;
  }

  // Toggle the panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Toggle between local and production backends
  const toggleBackend = () => {
    const newValue = !useProduction;
    setUseProduction(newValue);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('useProductionBackend', newValue.toString());
    }

    // Reload the page to apply the changes
    window.location.reload();
  };

  // Test the backend connection
  const testBackend = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/test`);
      const data = await response.json();
      alert(`Backend connection successful!\nResponse: ${JSON.stringify(data)}`);
    } catch (error) {
      alert(`Backend connection failed!\nError: ${error.message}`);
    }
  };

  // Styles for the DevTools panel
  const styles = {
    button: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: 9999,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
    },
    panel: {
      position: 'fixed',
      bottom: '80px',
      left: '20px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '15px',
      width: '300px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 9998,
      display: isOpen ? 'block' : 'none'
    },
    heading: {
      margin: '0 0 15px 0',
      color: '#dc3545',
      fontSize: '18px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '10px'
    },
    info: {
      margin: '10px 0',
      fontSize: '14px'
    },
    label: {
      fontWeight: 'bold',
      marginRight: '5px'
    },
    value: {
      wordBreak: 'break-all',
      fontSize: '12px',
      backgroundColor: '#e9ecef',
      padding: '3px 6px',
      borderRadius: '3px'
    },
    toggle: {
      display: 'flex',
      alignItems: 'center',
      margin: '15px 0'
    },
    switch: {
      position: 'relative',
      display: 'inline-block',
      width: '60px',
      height: '34px',
      marginRight: '10px'
    },
    slider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: useProduction ? '#dc3545' : '#ccc',
      transition: '0.4s',
      borderRadius: '34px'
    },
    sliderBefore: {
      position: 'absolute',
      content: '""',
      height: '26px',
      width: '26px',
      left: useProduction ? '30px' : '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%'
    },
    testButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '10px',
      width: '100%'
    }
  };

  return (
    <>
      <button style={styles.button} onClick={togglePanel}>
        🛠️
      </button>

      <div style={styles.panel}>
        <h3 style={styles.heading}>Developer Tools</h3>

        <div style={styles.info}>
          <span style={styles.label}>Environment:</span>
          <span>{process.env.NODE_ENV}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Hostname:</span>
          <span>{window.location.hostname}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Backend URL:</span>
          <div style={styles.value}>{backendUrl}</div>
        </div>

        <div style={styles.toggle}>
          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={useProduction}
              onChange={toggleBackend}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={styles.slider}>
              <span style={styles.sliderBefore}></span>
            </span>
          </label>
          <span>
            {useProduction ? 'Using Production Backend' : 'Using Local Backend'}
          </span>
        </div>

        <button style={styles.testButton} onClick={testBackend}>
          Test Backend Connection
        </button>
      </div>
    </>
  );
};

export default DevTools;
