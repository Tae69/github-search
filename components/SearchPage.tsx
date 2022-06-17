import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { InputAdornment, TextField, IconButton, Grid, Pagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import ErrorIcon from '@mui/icons-material/Error';
import styles from '../styles/index.module.css';
import { UserCard } from '../components/UserCard';
import { thousandSeparator } from '../utils/formatter';
import { GitHubUser, searchUsers } from '../utils/githubApi';
import { debounce } from '../utils/debounce';
import { PlaceholderUserCard } from '../components/PlaceholderUserCard';

const Home = () => {
	const [text, setText] = useState('');
	const [keyword, setKeyword] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [totalFound, setTotalFound] = useState(0);
	const [users, setUsers] = useState<GitHubUser[]>([]);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('')

	function onKeywordChange(event: ChangeEvent<HTMLInputElement>) {
		setText(event.target.value);
	}

	const search = useMemo(() => debounce((keyword: string, pageNumber: number) => {
		setKeyword(keyword);
		setError('');

		if (keyword.length <= 0) {
			setPageNumber(1);
			return;
		}

		setLoading(true);
		setNotFound(false);
		searchUsers(keyword, pageNumber).then(body => {
			setNotFound(body.total_count === 0);
			setTotalFound(body.total_count);
			setUsers(body.items);
		})
			.catch(err => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, 500), []);

	useEffect(() => {
		search(text, pageNumber);
	}, [text, pageNumber, search])


	function onPageChange(event: React.ChangeEvent<unknown>, pageNum: number) {
		setPageNumber(pageNum);
	}

	return (
		<>
			<TextField
				hiddenLabel
				value={text}
				placeholder='Enter GitHub username, i.e. Gearon'
				fullWidth
				margin="dense"
				onChange={onKeywordChange}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{
								text.length > 0
									?
									<IconButton
										onClick={() => setText('')}
										aria-label="Clear search term"
										edge="end"
									>
										<ClearIcon />
									</IconButton>
									: null
							}
						</InputAdornment>
					)
				}}
			/>

			{!loading && keyword.length < 1 &&
				<Box className={`${styles.box} ${styles.boxDescription}`}>
					<div className={styles.description}>
						<GitHubIcon />
						<Typography variant="h1">
							GitHub
						</Typography>
						<Typography>
							Enter GitHub username and search users matching the file input like Google Search, click avatars to view more details including repositories, followers, and following.
						</Typography>
					</div>
				</Box>
			}

			{
				loading && (
					<>
						<Typography sx={{ my: 1 }}>
							Finding GitHub users...
						</Typography>
						<Grid container spacing={2}>
							{
								(new Array(users.length || 4).fill(null)).map((_, index) => (
									<Grid item xs={6} key={index}>
										<PlaceholderUserCard />
									</Grid>
								))
							}
						</Grid>
					</>
				)
			}

			{!loading && keyword.length >= 1 && notFound && (
				<Box className={`${styles.box} ${styles.boxDescription}`}>
					<div className={styles.description}>
						<SearchIcon fontSize="large" />
						<Typography>
							No search result found for
						</Typography>
						<Typography sx={{ fontWeight: 'bold' }}>
							{keyword}
						</Typography>
					</div>
				</Box>
			)}

			{!loading && !!error && (
				<Box className={`${styles.box} ${styles.boxDescription}`}>
					<div className={styles.description}>
						<ErrorIcon fontSize="large" />
						<Typography>
							{error}
						</Typography>
					</div>
				</Box>
			)}

			{!loading && keyword.length >= 1 && users.length > 0 && !error && (
				<>
					<Typography sx={{ my: 1 }}>
						{thousandSeparator(totalFound)} GitHub users found
					</Typography>
					<Grid container spacing={2}>
						{
							users.map(user => (
								<Grid item xs={6} key={user.login}>
									<UserCard key={user.login} user={user} keyword={keyword} />
								</Grid>
							))
						}
					</Grid>
					{
						totalFound > 12 && (
							<Pagination page={pageNumber} className={styles.pagination} color="primary" sx={{ mt: 3, justifyContent: 'center' }} shape="rounded" count={Math.ceil(totalFound / 12)} onChange={onPageChange} />
						)
					}
				</>
			)}
		</>
	);
};

export default Home;