"use client";

import { Container, Menu, Group, Center, Text, useMantineTheme } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './cherry-pick-bar.module.css'

export default function CherryPickBar({boards, handleBoard, selectedBoard, boardColumns, handleBoardColumn, selectedBoardColumn}) {
	const theme = useMantineTheme();
	
	return (
		<Group>
			<Menu key={'boards'} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
			  <Menu.Target>
				<div
				  className={classes.link}
				  onClick={(event) => event.preventDefault()}
				>
				  <Center>
					<span className={classes.linkLabel}>{selectedBoard ? selectedBoard.name : 'Select a board'}</span>
					<IconChevronDown size="0.9rem" stroke={1.5} color={theme.colors.cherry}/>
				  </Center>
				</div>
			  </Menu.Target>
			  <Menu.Dropdown>
			  	{
					boards.map((item) => {
						return <Menu.Item className={classes.dropdown} key={item.id} onClick={() => handleBoard(item)}>{item.name}</Menu.Item>
					})
				}
			  </Menu.Dropdown>
			</Menu>
			{
				boardColumns &&
					<Menu key={'columns'} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
			  		<Menu.Target>
						<div
				  		className={classes.link}
				  		onClick={(event) => event.preventDefault()}
						>
				  		<Center>
							<span className={classes.linkLabel}>{selectedBoardColumn ? selectedBoardColumn.name : 'Select a column'}</span>
							<IconChevronDown size="0.9rem" stroke={1.5} color={theme.colors.cherry}/>
				  		</Center>
						</div>
			  		</Menu.Target>
			  		<Menu.Dropdown>
				  		{
					  		boardColumns.map((item) => {
						  		return <Menu.Item className={classes.dropdown} key={item.name} onClick={() => handleBoardColumn(item)}>{item.name}</Menu.Item>
					  		})
				  		}
			  		</Menu.Dropdown>
					</Menu>
			}
		</Group>
	)
}