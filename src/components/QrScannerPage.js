/* eslint-disable */
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import '../styles/Programs.css'; // Adjust the path if needed

const QrScannerPage = () => {
  const [scanError, setScanError] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      window.location.href = data; // Redirect to the URL encoded in the QR code
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
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment" // Use back camera
      />
      {scanError && <p style={{ color: 'red' }}>{scanError}</p>}
      <button onClick={() => navigate(-1)} >Cancel</button>
    </div>
  );
};

export default QrScannerPage;
