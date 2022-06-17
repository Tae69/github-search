import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BottomBar, Route } from '../components/BottomBar';
import styles from '../styles/index.module.css';
import { useRouter } from 'next/router';
import SearchPage from '../components/SearchPage';
import FavoritePage from '../components/FavoritePage';
import { ThemeToggler } from '../components/ThemeToggler';

const Home: NextPage = () => {
  const router = useRouter();

  const [selectedRoute, setSelectedRoute] = useState<Route>(Route.Home);

  function onRouteChange(routeName: Route) {
    if (selectedRoute === routeName) {
      return;
    }

    setSelectedRoute(routeName);
    router.push(routeName === Route.Home ? '/' : 'liked');
  }

  useEffect(() => {
    if (window.location.pathname === '/liked') {
      setSelectedRoute(Route.Liked);
    }

    router.prefetch('/')
    router.prefetch('/liked')
  }, [router])

  return (
    <Container maxWidth='sm' className={styles.container}>
      <Box
        sx={{
          paddingTop: '8px',
          paddingBottom: '70px'
        }}
        className={styles.box}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', py: 2 }}>
            {selectedRoute === Route.Home ? 'Search' : 'Favorites'}
          </Typography>
          <ThemeToggler />
        </div>


        <div style={{ display: selectedRoute === Route.Home ? 'flex' : 'none', flexDirection: 'column', flex: 1 }}>
          <SearchPage />
        </div>

        <div style={{ display: selectedRoute === Route.Liked ? 'flex' : 'none', flexDirection: 'column', flex: 1 }}>
          <FavoritePage />
        </div>

        <BottomBar onChange={onRouteChange} activeRoute={selectedRoute} />
      </Box>
    </Container >
  );
}

export default Home;
