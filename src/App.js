import logo from './logo.svg';
import './App.css';
import { PageLayout } from "./components/Layout/PageLayout";
import { DashBoard } from "./components/Admin/AdminDashBoard";
import axios from "axios";
import React, { Children, Component, useState, useEffect, Fragment, useReducer } from "react";
import { useMsal } from "@azure/msal-react";
import {InteractionRequiredAuthError, InteractionStatus} from "@azure/msal-browser";
import { getResourceFromOnboardingApi } from "./components/Token/getResource";
import { loginRequestAdmins } from "./authConfig";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const URL = 'https://localhost:5001/api/AdminLogin/adminrole';

//This is a loading functional component
const Loading = () => <div className="loader center"> <i className="fa fa-cog fa-spin" /></div>;

function App() {
 
  const {instance, inProgress, accounts} = useMsal();
  const [data, setData] = useState({ adminInfo: {} });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    let didCancel = false;
    const accessTokenRequest = {
      ...loginRequestAdmins,
      account: accounts[0]
    };

    const fetchData = async () => { 
      
      instance.acquireTokenSilent(accessTokenRequest).then((response) => {
        console.log(response.accessToken)
        getResourceFromOnboardingApi(response.accessToken, URL).then(response => setData(response));
        setIsLoading(false);
      }).catch((e) => {
        instance.acquireTokenPopup(accessTokenRequest).then((response) => {
          getResourceFromOnboardingApi(response.accessToken, URL).then(response => setData(response));
          setIsLoading(false);
        });
    });
  }
       
  if (data && inProgress === InteractionStatus.None){
    //Calls the above function
    fetchData(); 
  }

  console.log(data);
  }, [data, instance, inProgress, accounts]);

  return (
    
    <div>
      <PageLayout>
        { isLoading ? <Loading/> : <DashBoard adminRole={data.adminRole}/>}
      </PageLayout>
    </div>
  );
}

export default App;
