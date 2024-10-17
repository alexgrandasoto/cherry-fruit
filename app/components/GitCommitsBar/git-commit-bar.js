"use client";

import { Text, Button } from '@mantine/core';
import axios from 'axios'

export default function GitCommitBar({commits}) {
	console.log(commits)
	const cherryPickCommits = async () => {
	  const commitsSha = []
	  for (const commit of commits){
		  commitsSha.push({sha: commit.sha})
	  }
	  try {
		const response = await axios.post('/api/git/cherry-pick', {
			commits: commitsSha,
			branch: "master"
		});
		console.log(response.data)
	  } catch (error) {
		console.error('Error fetching Jira boards:', error.message);
	  }
	};
	
	return (
		<div>
			<Button onClick={cherryPickCommits}>CHERRY PICK</Button>
			{
				commits.map((commit) => {
					return <Text key={commit.sha}>{commit.commit.message}</Text>
				})
			}
		</div>
	)
}