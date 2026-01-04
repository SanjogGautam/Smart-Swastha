// src/main.jsx
import React from 'react'; // Imports the React library
import ReactDOM from 'react-dom/client'; // Imports ReactDOM for DOM manipulation
import App from './App.jsx'; // Imports your main App component
import './index.css'; // Imports global CSS
import { ClerkProvider } from '@clerk/clerk-react';

// Load the Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Throw error if the key is not set
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key for Clerk");
}

// Render the application to the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
