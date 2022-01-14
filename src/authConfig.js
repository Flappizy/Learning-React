export const msalConfig = {
    auth: {
      clientId: "20f85df0-0e2b-4151-bcd8-80e36592fea9",
      authority: "https://login.microsoftonline.com/215b7ce2-5263-4593-a622-da030405d151", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };

  export const loginRequestAdmins = {
    scopes: ["api://192f8042-1e49-44ee-a61e-4c6bde4e6621/Admin.Read"]
   };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };