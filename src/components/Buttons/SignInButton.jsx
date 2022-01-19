import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequestAdmins } from "../../authConfig";
import Button from "react-bootstrap/Button";


/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = ({handleLoginAndFetchAdminRole, instance}) => {

    return (
        <Button 
            variant="secondary" 
            className="ml-auto" 
            onClick={() => handleLoginAndFetchAdminRole(instance)}
        >
            Sign in
        </Button>
    );
}