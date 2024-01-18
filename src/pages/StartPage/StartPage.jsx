import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { StartWindow } from '../../components/StartWindow/StartWindow';

export default function StartPage() {
  return (
    <HelmetProvider>
      <title>Start</title>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--dark-blue)',
          position: 'relative',
        }}
      >
        <Helmet>
          <title>Start</title>
        </Helmet>
        <StartWindow />
      </div>
    </HelmetProvider>
  );
}
