import {
  Button,
  Container,
  Icon,
  Message,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import Link from 'next/link';
import Image from 'next/image';

import SEO from '@/components/SEO';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import getRelativeFlagPath from '@/utils/getRelativeFlagPath';
import useHistoricalData from '@/utils/useHistoricalData';
import IntervalDropdown from '@/components/IntervalDropdown';

export default function Country({ country }) {
  const { cases, deaths, loading, error, setInterval } = useHistoricalData(
    country
  );

  return (
    <>
      <SEO title={country.country} />
      <Container
        textAlign="center"
        style={{ paddingTop: 25, paddingBottom: 25 }}
      >
        <div
          id="country-header"
          style={{
            marginBottom: '1rem',
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: '1fr repeat(3, auto) 1fr',
            justifyItems: 'center',
          }}
        >
          <Link href="/">
            <Button
              icon
              compact
              basic
              labelPosition="left"
              style={{ marginRight: 'auto' }}
            >
              Back
              <Icon name="left arrow" />
            </Button>
          </Link>
          <h1 style={{ margin: 0 }}>
            <div style={{ display: 'inline', marginRight: 10 }}>
              <Image
                src={getRelativeFlagPath(country)}
                alt={country.country}
                width={30}
                height={22}
                className="flag-small"
              />
            </div>
            {country.country}
          </h1>
        </div>
        <Statistic.Group
          widths={3}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Statistic color="blue">
            <Statistic.Value>
              {country.casesPerOneMillion.toLocaleString()}
            </Statistic.Value>
            <Statistic.Label>Cases per million</Statistic.Label>
          </Statistic>
          <Statistic color="teal">
            <Statistic.Value>
              {country.testsPerOneMillion.toLocaleString()}
            </Statistic.Value>
            <Statistic.Label>Tests per million</Statistic.Label>
          </Statistic>
          <Statistic color="red">
            <Statistic.Value>
              {country.deathsPerOneMillion.toLocaleString()}
            </Statistic.Value>
            <Statistic.Label>Deaths per million</Statistic.Label>
          </Statistic>
          <Statistic color="violet">
            <Statistic.Value>
              {country.activePerOneMillion.toLocaleString()}
            </Statistic.Value>
            <Statistic.Label>Active per million</Statistic.Label>
          </Statistic>
          <Statistic color="orange">
            <Statistic.Value>
              {country.criticalPerOneMillion.toLocaleString()}
            </Statistic.Value>
            <Statistic.Label>Critical per million</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>
              {country.recoveredPerOneMillion.toLocaleString()}
            </Statistic.Value>
            <Statistic.Label>Recovered per million</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        {error ? (
          <Message error style={{ marginTop: 25 }}>
            <Message.Header>Oops! Something went wrong...</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <Segment
            style={{ marginTop: 25, marginBottom: 25, minHeight: '50vh' }}
            loading={loading}
          >
            <IntervalDropdown setInterval={setInterval} />
            {cases && (
              <>
                <LineChart data={cases.total} title="Total Cases" />
                <BarChart data={cases.daily} title="Daily New Cases" />
              </>
            )}
            {deaths && (
              <>
                <LineChart data={deaths.total} title="Total Deaths" />
                <BarChart data={deaths.daily} title="Daily New Deaths" />
              </>
            )}
          </Segment>
        )}
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const countries = await (
    await fetch('https://disease.sh/v3/covid-19/countries?sort=deaths')
  ).json();
  const paths = countries
    .splice(0, 10)
    .map((country) => ({ params: { country: country.country } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(
      params.country
    )}`
  );
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }
  const country = await response.json();
  return {
    props: {
      country,
    },
    revalidate: 60,
  };
}
