import React from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
  const gaId = process.env.GA_ID;
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script id='google-analytics'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
