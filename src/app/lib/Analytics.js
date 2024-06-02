import React from 'react';
import Script from 'next/script';

export default function Analytics() {
  const token = process.env.CF_TOKEN;
  return (
    <>
      <Script 
        defer
        src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon={`{"token": "${token}"}`}
      />
    </>
  )
}
