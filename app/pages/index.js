"use client";

import {useState, useEffect} from 'react'
import axios from 'axios'
import CherryIcon from '../utils/cherry-icon.js'
import classes from './header.module.css'
import Card from '../components/Card/card.js'
import CherryPickBar from '../components/CherryPickBar/cherry-pick-bar.js'
import GitCommitBar from '../components/GitCommitsBar/git-commit-bar.js'
import LoginButtons from '../components/LoginButtons/login-buttons.js'

import { Container, Grid } from '@mantine/core';

export default function Home() {
 	// TODO: add a login for jira (and git too??)
	
	const [boards, setBoards] = useState(null)
	const [selectedBoard, setSelectedBoard] = useState(null)
	const [boardColumns, setBoardColumns] = useState(null)
	const [selectedBoardColumn, setSelectedBoardColumn] = useState(null)
	const [issues, setIssues] = useState(null)
	const [commits, setCommits] = useState(null)
	
	const accessTokenJira = localStorage.getItem('accessTokenJira')
	
	const fetchJiraBoards = async () => {
	  try {
		const response = await axios.get('/api/jira/boards', {
			params: {
				accessToken: accessTokenJira
			}
		});
		setBoards(response.data)
	  } catch (error) {
		console.error('Error fetching Jira boards:', error.message);
	  }
	};
	
	const fetchJiraColumns = async () => {
	  try {
		const response = await axios.get(`/api/jira/columns`, {
			params: {
				projectId: selectedBoard.id,
				accessToken: accessTokenJira
			}
		});
		setBoardColumns(response.data[0].statuses)
	  } catch (error) {
		console.error('Error fetching Jira boards:', error.message);
	  }
	};
	
	const fetchJiraIssues = async () => {
		try {
			const response = await axios.get(`/api/jira/issues`, {
				params: {
					state: selectedBoardColumn.name,
					boardId: selectedBoard.id,
					accessToken: accessTokenJira
				}
			});
			setIssues(response.data.issues)
		  } catch (error) {
			console.error('Error fetching Jira boards:', error.message);
		  }
	}
	
	const fetchCommits = async (keys) => {
		try {
			const sinceDate = getOldestDate(issues).fields.created
			const response = await axios.post(`/api/git/commits`, {
				issueIds: keys,
				sinceDate: sinceDate
			});
			setCommits(response.data)
		  } catch (error) {
			console.error('Error fetching Git commits:', error.message);
		  }
	}
	
	const fetchIssueDevelopment = async () => {
		try {
			const response = await axios.get(`/api/jira/development`, {
				params: {
					issueId: 'ECEMCAT-52',
				}
			});
			console.log(response.data)
		  } catch (error) {
			console.error('Error fetching Development info:', error.message);
		  }
	}
	
	const handleBoardColumn = (item) => {
		setSelectedBoardColumn(item)
		setCommits(null)
		setIssues(null)
	}
	
	const handleBoard = (item) => {
		setSelectedBoard(item)
		setBoardColumns(null)
		setSelectedBoardColumn(null)
		setCommits(null)
		setIssues(null)
	}
	
	useEffect(() => {
	  fetchJiraBoards();
	}, []);
	
	useEffect(() => {
	  if(selectedBoard){
	  	fetchJiraColumns();  
	  }
	}, [selectedBoard]);
	
	useEffect(() => {
	  if(selectedBoardColumn){
		  fetchJiraIssues();  
	  }
	}, [selectedBoardColumn]);
	
	useEffect(() => {
	  const newArr = []
	  if(issues){
		if(issues.length > 0){
			for(const issue of issues){
				newArr.push(issue.key)
			}
			fetchCommits(newArr)
	  	}
  	  }
	}, [issues])
	
  return (
	<>
		<header className={classes.header}>
			<Container className={classes.inner} fluid>
	  			<CherryIcon />
				<LoginButtons />
				{
					boards &&
					<CherryPickBar boards={boards} handleBoard={handleBoard} selectedBoard={selectedBoard} boardColumns={boardColumns} handleBoardColumn={handleBoardColumn} selectedBoardColumn={selectedBoardColumn} />
				}
			</Container>
		</header>
		<Container fluid>
			<Grid>
			{
				issues &&
				<Grid.Col span={{ base: 12, xs: 8 }} className={classes.cardscontainer}>
				{
					issues.map((issue) => {
						return <Card issue={issue} key={issue.id}/>
					})
				}
				</Grid.Col>
			}
			{
				commits &&
				<Grid.Col span={{ base: 12, xs: 4 }}>
					<GitCommitBar commits={commits} />
				</Grid.Col>
			}
			</Grid>
		</Container>
	</>
  );
}


function getOldestDate(issues) {
  // Use reduce to iterate over the array and find the oldest date
  return issues.reduce((oldest, current) => {
	return new Date(current.fields.created) < new Date(oldest.fields.created) ? current : oldest;
  });
}