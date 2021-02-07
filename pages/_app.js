import '../styles/global.css';
import 'nprogress/nprogress.css';
import 'semantic-ui-css/semantic.min.css';

import NProgress from 'nprogress';
import Router from 'next/router';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
