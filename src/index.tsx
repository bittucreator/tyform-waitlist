import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { Tyform } from './screens/Tyform';

const container = document.getElementById('app');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Tyform />
    <Analytics />
  </React.StrictMode>
);
