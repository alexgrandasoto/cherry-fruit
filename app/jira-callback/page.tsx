"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function JiraCallback() {
  const router = useRouter();

  useEffect(() => {
	const handleJiraCallback = async () => {
	  // Get the authorization code from the query parameters
	  const queryParams = new URLSearchParams(window.location.search);
	  const code = queryParams.get('code');
	  const state = queryParams.get('state');
	  const oauthState = localStorage.getItem('oauth_state')

	  if (code) {
		try {
		  // Send the authorization code to the backend to exchange it for an access token
		  const response = await axios.get('/api/jira/callback', {
	  			params: {
					  code: code,
					  state: state,
					  oauthState: oauthState
				  }
			  }
	  	  );

		  // Save the access token to the local storage, state, or context
		  localStorage.setItem('accessTokenJira', response.data.accessToken);
		  
		  // Redirect the user to the desired page (e.g., dashboard)
		  router.push('/');
		} catch (error) {
		  console.error('Error handling Jira callback:', error);
		  // Handle error appropriately, maybe redirect to an error page
		}
	  }
	};
	
	handleJiraCallback();
  }, [router.query]);

  return <div>Processing login...</div>;
}