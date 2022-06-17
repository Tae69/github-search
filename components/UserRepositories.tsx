import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { GetRepoResponse, getUserRepos, GetUserResponse, HttpError } from "../utils/githubApi";
import { abbreviateNumber } from '../utils/formatter';
import { Loading } from './Loading';

type Props = {
	user: GetUserResponse
}

export const UserRepositories = ({ user }: Props) => {
	const [repos, setRepos] = useState<GetRepoResponse[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetch() {
			try {
				const data = await getUserRepos(user.login);
				setRepos(data);
			}
			catch (err) {
				if (err instanceof HttpError) {
					setError(err.message);
				}
				else {
					setError('Unexpected error occurred, please try again')
				}
			}
			finally {
				setIsLoading(false);
			}
		}

		setIsLoading(true);
		fetch();
	}, []);

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
				<Loading sx={{ width: '80px', height: '80px' }} color="primary" />
			</Box>
		);
	}

	if (error) {
		return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<Typography>{error}</Typography>
		</Box>
	}

	return (
		<Grid container spacing={2} sx={{ mt: 0 }}>
			{
				repos.map(repo => (
					<Grid item xs={6} key={repo.name}>
						<Card>
							<CardContent sx={{ p: 1, paddingBottom: '1px !important' }}>
								<Typography fontWeight="bold" fontSize="small" sx={{ marginBottom: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
									{repo.name}
								</Typography>
								<Typography fontSize="small">
									{abbreviateNumber(repo.stargazers_count)} stars
								</Typography>
								<Typography fontSize="small">
									{abbreviateNumber(repo.forks_count)} forks
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))
			}
		</Grid>
	);
}