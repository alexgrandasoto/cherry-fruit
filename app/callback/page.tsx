"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
	const handleGitHubCallback = async () => {
	  // Get the authorization code from the query parameters
	  const queryParams = new URLSearchParams(window.location.search);
	  const code = queryParams.get('code');

	  if (code) {
		try {
		  // Send the authorization code to the backend to exchange it for an access token
		  const response = await axios.post('/api/git/callback', { code });

		  // Save the access token to the local storage, state, or context
		  localStorage.setItem('accessToken', response.data.accessToken);

		  // Redirect the user to the desired page (e.g., dashboard)
		  router.push('/');
		} catch (error) {
		  console.error('Error handling GitHub callback:', error);
		  // Handle error appropriately, maybe redirect to an error page
		}
	  }
	};
	
	handleGitHubCallback();
  }, [router.query]);

  return <div>Processing login...</div>;
}