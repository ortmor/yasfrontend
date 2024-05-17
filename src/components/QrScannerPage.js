/* eslint-disable */
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import '../styles/Programs.css'; // Adjust the path if needed

const QrScannerPage = () => {
  const [scanError, setScanError] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      window.location.href = data; 
    }
  };

  const handleError = (err) => {
    console.error(err);
    setScanError(err.message);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="qr-scanner-container">
      <h2>Scan QR</h2>
      <QrReader
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment"
      />
      {scanError && <p style={{ color: 'red' }}>{scanError}</p>}
      <button onClick={() => navigate(-1)} >Cancel</button>
    </div>
  );
};

export default QrScannerPage;
