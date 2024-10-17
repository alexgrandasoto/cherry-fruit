"use client";

import { useState, useEffect } from 'react'
import { Card, Image, Text, Group, RingProgress, Button, ActionIcon } from '@mantine/core';
import { IconGitCherryPick, IconExternalLink, IconCheck } from '@tabler/icons-react';
import axios from 'axios'
import classes from './card.module.css'

export default function CherryCard({issue}) {
	const [selected, setSelected] = useState(false)

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
		  <div onClick={() => setSelected(!selected)}>
		  <Card.Section>
		  	{
				selected &&
		  		<ActionIcon variant="default" radius={50} size={40} className={classes.check} color="lime" variant="filled">
			  		<IconCheck size={19}/>
				</ActionIcon>
			}
			<Image
			  src="images/jirabg.png"
			  alt="Jira icon"
			  height={100}
			/>
		  </Card.Section>
		
		  <Group justify="space-between" mt="xl">
			<Text fz="sm" fw={700} className={classes.title}>
			  {issue.fields.summary}
			</Text>
			<Group gap={5}>
			  <Text fz="xs" c="dimmed">
				{issue.key}
			  </Text>
			</Group>
		  </Group>
		  <Text mt="sm" mb="md" c="dimmed" fz="xs">
		  	96 commits
		  </Text>
		  </div>
		  <Card.Section className={classes.footer}>
		  	<Button 
			  size="compact-xs"
			  leftSection={<IconGitCherryPick size={14} />}
			>Cherry-pick</Button>
			<Button
				variant="light"
				size="compact-xs"
				rightSection={<IconExternalLink size={14} />}
			  >
				Open on Jira
			  </Button>
		  </Card.Section>
		</Card>
	)
}