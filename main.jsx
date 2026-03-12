// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('🚀 main.jsx ажиллаж байна...');
console.log('📌 App компонент:', App);

const rootElement = document.getElementById('root');
console.log('📌 root element:', rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ React app амжилттай аслаа!');
} else {
  console.error('❌ root element олдсонгүй!');
}