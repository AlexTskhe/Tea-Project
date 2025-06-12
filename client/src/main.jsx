import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
// import './index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);
