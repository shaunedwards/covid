import Image from 'next/image';
import { useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import SEO from '../components/SEO';
import Overview from '../components/Overview';
import Search from '../components/Search';
import getRelativeFlagPath from '../utils/getRelativeFlagPath';

export default function Home({ countries }) {
  // selected country defaults to whichever has highest death toll
  const [initialCountry] = countries;
  const [country, setCountry] = useState(initialCountry);

  function changeCountry(selected) {
    const selectedCountry = countries.find((c) => c.country === selected);
    setCountry(selectedCountry);
  }

  function handleChange(_, input) {
    changeCountry(input.value);
  }

  function handleClick(value) {
    changeCountry(value);
  }

  function turnCountriesIntoOptions() {
    return countries.map((item) => ({
      key: item.countryInfo.iso2,
      value: item.country,
      text: item.country,
      image: () => (
        <div
          style={{
            display: 'inline',
            verticalAlign: 'middle',
            marginRight: 10,
          }}
        >
          <Image
            width={21}
            height={15}
            alt={item.country}
            src={getRelativeFlagPath(item)}
            className="flag-icon"
          />
        </div>
      ),
    }));
  }

  return (
    <>
      <SEO title="Overview" />
      <Container as="main" fluid>
        <Grid columns={4} divided stackable padded>
          <Overview countries={countries} handleClick={handleClick} />
          <Search
            selected={country}
            handleChange={handleChange}
            countries={turnCountriesIntoOptions()}
          />
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const countries = await (
    await fetch('https://disease.sh/v3/covid-19/countries?sort=deaths')
  ).json();
  const yesterday = await (
    await fetch('https://disease.sh/v3/covid-19/countries?yesterday=1')
  ).json();
  for (const country of countries) {
    country.yesterday = yesterday.find((c) => c.country === country.country);
  }
  return {
    props: {
      countries,
    },
    revalidate: 60,
  };
}
