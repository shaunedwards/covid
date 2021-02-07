import Head from 'next/head';
import { useRouter } from 'next/router';
import config from '../config';

export default function SEO({ title }) {
  const router = useRouter();
  const { title: siteTitle, description, baseUrl } = config;
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{`${title} - ${siteTitle}`}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} - ${siteTitle}`} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={`${baseUrl}/logo.svg`} />
      <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
    </Head>
  );
}
