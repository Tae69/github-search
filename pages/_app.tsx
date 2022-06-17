import '../styles/globals.css'
import type { AppProps } from 'next/app'
import createEmotionCache from '../utils/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';
import store from '../store/index';
import { Provider } from 'react-redux';
import { App } from '../components/App';

const clientSideEmotionCache = createEmotionCache();
interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache,
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: ExtendedAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <App Component={Component} pageProps={pageProps} />
      </Provider>
    </CacheProvider>
  );
}

export default MyApp
