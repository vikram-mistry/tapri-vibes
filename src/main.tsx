import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </React.StrictMode>
);
