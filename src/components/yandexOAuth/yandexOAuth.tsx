import { FC, useEffect } from 'react';

export const YandexOAuth: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js";
    script.async = true;
  
    document.head.appendChild(script);
  }, []);

  return <div></div>
}