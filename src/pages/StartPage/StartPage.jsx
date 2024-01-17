import React from 'react';
import { Helmet } from 'react-helmet';

export default function StartPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--dark-blue)',
      }}
    >
      <Helmet>
        <title>Start</title>
      </Helmet>
    </div>
  );
}
