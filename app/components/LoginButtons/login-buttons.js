"use client";

import {useEffect, useState} from 'react'

import { Button } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

// Example using React
const GITHUB_CLIENT_ID = 'Ov23liUFSyLUyhdcHuam';  // Replace with your GitHub client ID
const REDIRECT_URI = 'http://localhost:3000/callback'; 
const JIRA_CLIENT_ID = 'RP8N0sFSpAHdnFpiGDspUSRBGRejC5nT'


export default function LoginButtons() {
	
	const [jiraLogged, setJiraLogged] = useState(false)
	const [githubLogged, setGithubLogged] = useState(false)
	
	useEffect(() => {
		if(localStorage.getItem('accessTokenJira')) {
			setJiraLogged(true)
		}
		if(localStorage.getItem('accessToken')){
			setGithubLogged(true)
		}
	}, [])
	
	const loginWithGithub = () => {
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo,user`;
	};
	
	const loginWithJira = () => {
		const state = uuidv4();
		const redirectUri = 'http://localhost:3000/jira-callback';
		const authUrl = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${JIRA_CLIENT_ID}&scope=manage%3Ajira-data-provider%20read%3Ajira-work%20manage%3Ajira-project&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fjira-callback&state=${state}&response_type=code&prompt=consent`;
		
		localStorage.setItem('oauth_state', state)
		
		window.location.href = authUrl;
	}
	
  return (
	<div>
		{
			githubLogged ? 
			<Button>
				Logged in Github
			</Button>
			:
			<Button onClick={loginWithGithub}>
				Connect GitHub
  			</Button>
		}
		{
			jiraLogged ? 
			<Button>
				Logged in Jira
			</Button>
			:
			<Button onClick={loginWithJira}>
				Connect Jira account
			</Button>
		}
	</div>
  )
};