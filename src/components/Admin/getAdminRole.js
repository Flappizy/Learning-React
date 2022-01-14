import React from "react";
import axios from "axios";
import React, { Children, Component, useState, useEffect, Fragment, useReducer } from "react";

const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };


export const getDataFromAPI = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    
    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });
  
    //This runs the first time the functional component mounts then, it also runs whenever the 'url' state changes
    useEffect(() => {
      let didCancel = false;
  
      //This function fetches the data from an api
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });
  
        try {
          //The is where the request to the api happens, the data returned is within the result variable
          const result = await axios(url);
          //This sets the data state, by taking the data prop from the result object 
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } catch (error) { //Catches any error that happens during the process of the request to the API
          //If the error happens, this sets the error state
          dispatch({ type: 'FETCH_FAILURE' });
        }
  
      };
      //Calls the above function
      fetchData();
      
      return () => {
        didCancel = true;
      };
  
    }, [url]);
  
    return [state, setUrl];
  };