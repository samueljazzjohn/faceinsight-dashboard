interface Environment {
    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;
    BACKEND_URL: string
  }
  
  function getConstants(): Environment {
    if (import.meta.env.VITE_FACEBOOK_APP_ID && import.meta.env.VITE_FACEBOOK_APP_SECRET && import.meta.env.VITE_BACKEND_URL) {
      return {
        FACEBOOK_APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID,
        FACEBOOK_APP_SECRET: import.meta.env.VITE_FACEBOOK_APP_SECRET,
        BACKEND_URL: import.meta.env.VITE_BACKEND_URL
      };
    } else {
      throw new Error("Environment variables not available");
    }
  }
  
  export default getConstants;
  