import { useEffect } from 'react';

// Extend the global window object to include fbAsyncInit
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      AppEvents: {
        logPageView: () => void;
      };
      login: (callback: (response: any) => void, options?: { scope: string }) => void;
    };
  }
}

const useFacebookSdk = (appId: string, version: string): void => {
  useEffect(() => {
    // Load the Facebook SDK
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Initialize the SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: version,
      });

      window.FB.AppEvents.logPageView();
    };
  }, [appId, version]);
};

export default useFacebookSdk;
