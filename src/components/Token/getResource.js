import axios from 'axios';

/**
 * Attaches a given access token to an OnboardingApp API call. Returns the resource gotten from the API 
 */
 export async function getResourceFromOnboardingApi(accessToken, url) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}