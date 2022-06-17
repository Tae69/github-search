import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Tabs, Typography, Tab } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { ThemeToggler } from "../../components/ThemeToggler";
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { getUser, GetUserResponse, HttpError } from "../../utils/githubApi";
import Link from "../../components/Link";
import { LocationCity } from "@mui/icons-material";
import { abbreviateNumber } from '../../utils/formatter';
import { UserRepositories } from '../../components/UserRepositories';
import { UserFollowers } from '../../components/UserFollowers';
import { UserFollowing } from '../../components/UserFollowing';

type Props = {
	user: GetUserResponse
}

interface TabPanelProps {
	children?: React.ReactNode;
	value: number;
	index: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index } = props;

	return (
		<div style={{ display: value === index ? 'flex' : 'none', flex: 1 }}>
			{children}
		</div>
	);
}

function renderTabLabel(label: string, count: number) {
	return (
		<>
			<div>
				{label}
			</div>
			<div>
				({abbreviateNumber(count)})
			</div>
		</>
	)
}

const UserDetail: NextPage<Props> = ({ user }) => {
	const [value, setValue] = useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Container maxWidth='sm' sx={{ minHeight: '100vh', display: 'flex' }}>
			<Box
				sx={{ paddingTop: '8px', paddingBottom: '16px', flex: 1 }}
				display="flex"
				flexDirection="column"
			>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Link href="/">
						<IconButton aria-label="Home" component="span">
							<HomeIcon />
						</IconButton>
					</Link>
					<ThemeToggler />
				</div>

				<Box textAlign='center' sx={{ py: 2 }}>
					<Box sx={{ borderRadius: '50%', overflow: 'hidden', width: '150px', height: '150px', position: 'relative', margin: '8px auto' }}>
						<Image alt={user.login} src={user.avatar_url} loading="lazy" layout="fill" />
					</Box>
					<Typography variant="h5" sx={{ fontWeight: 'bold', pt: 2 }}>
						{user.login}
					</Typography>
					<Typography>
						{user.company}
					</Typography>
					{
						!!user.location && (
							<Box display="flex" justifyContent='center' alignItems="center">
								<LocationCityIcon fontSize="small" />
								<Typography sx={{ paddingLeft: 0.5 }}>
									{user.location}
								</Typography>
							</Box>
						)
					}
				</Box>

				<Box sx={{ borderBottom: 1, borderColor: 'divider', mx: -2, mt: 1 }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab sx={{ flex: 1 }} label={renderTabLabel('Repositories', user.public_repos)} />
						<Tab sx={{ flex: 1 }} label={renderTabLabel('Followers', user.followers)} />
						<Tab sx={{ flex: 1 }} label={renderTabLabel('Following', user.following)} />
					</Tabs>
				</Box>

				<TabPanel value={value} index={0}>
					<UserRepositories user={user} />
				</TabPanel>

				<TabPanel value={value} index={1}>
					<UserFollowers user={user} />
				</TabPanel>

				<TabPanel value={value} index={2}>
					<UserFollowing user={user} />
				</TabPanel>
			</Box >
		</Container >
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const username = context.params?.id;

		if (!username) {
			return {
				notFound: true
			};
		}

		const user: GetUserResponse = await getUser(username.toString());
		return {
			props: {
				user: user
			}
		}
	}
	catch (err) {
		if (err instanceof HttpError && err.errorCode === 404) {
			return {
				notFound: true
			};
		}

		throw err;
	}
}

export default UserDetail;