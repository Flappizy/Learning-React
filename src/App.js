import logo from './logo.svg';
import './App.css';
import { PageLayout } from "./components/Layout/PageLayout";
import { DashBoard } from "./components/Admin/AdminDashBoard";
import axios from "axios";
import React, { Children, Component, useState, useEffect, Fragment, useReducer } from "react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import {InteractionRequiredAuthError, InteractionStatus} from "@azure/msal-browser";
import { getResourceFromOnboardingApi } from "./components/Token/getResource";
import { loginRequest, loginRequestAdmins } from "./authConfig";
import { SignInButton } from "./components/Buttons/SignInButton";
import { SignOutButton } from "./components/Buttons/SignOutButton";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import { lodash, isEmpty } from 'lodash'

const URL = 'https://1fa7-154-113-18-216.ngrok.io/api/AdminLogin/adminrole';

//This is a loading functional component
const Loading = () => <div className="loader center"> <i className="fa fa-cog fa-spin" /></div>;

function App() {
 
  const {instance, inProgress, accounts} = useMsal();
  const [data, setData] = useState({ adminInfo: {} });
  const isAuthenticated = useIsAuthenticated();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  //This is a request you send to MSAL for to get logged in
  const accessTokenRequest = {
    ...loginRequestAdmins,
    account: accounts[0]
  };

  //This is the signin button event handler
  function handleLoginAndFetchAdminRole(instance) {

    //This pops up a microsoft login page, when you input your info and it veries it
    //It then returns a type AuthenticationResult, which includes properties like the
    //accessToken
    instance.loginPopup(loginRequestAdmins).then((response) => {
      //Writing the accessToken to the console
      console.log(response.accessToken)
      setAccessToken(response.accessToken);
      window.sessionStorage.setItem(accessToken, response.accessToken);
      //Sends a request to the api along with an accessToken, it then returns the role of the logged in user
      getResourceFromOnboardingApi(response.accessToken, URL).then(response =>{
        console.log(response)
        setData(response)
      });
    
      setIsLoading(false);
    }).catch((e) => {
      instance.acquireTokenPopup(accessTokenRequest).then((response) => {
        getResourceFromOnboardingApi(response.accessToken, URL).then(response => setData(response));
        setIsLoading(false);
      });
    });
  }

  /*
  useEffect(() => {
    
    const fetchData = async () => { 
      let token = window.sessionStorage.getItem(accessToken);
      const adminData = getResourceFromOnboardingApi(token, URL);
      setData(adminData); 
    }//
       
  if (isAuthenticated){    
    //Calls the above function
    fetchData(); 
    setIsLoading(false);
  }

  }, []);*/

   
  return (
    <div>
      <Navbar bg="primary" variant="dark">
                { isAuthenticated ? <SignOutButton /> : 
                <SignInButton 
                handleLoginAndFetchAdminRole={handleLoginAndFetchAdminRole} 
                instance={instance}
                /> }
      </Navbar>
            <h5><center>SPA client for onboarding app</center></h5>
      <AuthenticatedTemplate>
        {isLoading ? <Loading /> : <DashBoard adminRole={data.adminRole} />}
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;
