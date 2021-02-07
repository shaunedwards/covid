import React from 'react';
import { Grid } from 'semantic-ui-react';

import Stat from './Stat';
import Ranking from './Ranking';
import calcStatTotal from '../utils/calcStatTotal';

function Overview({ countries, handleClick }) {
  const totalDeaths = calcStatTotal(countries, 'deaths');
  const totalConfirmed = calcStatTotal(countries, 'cases');
  const totalRecovered = calcStatTotal(countries, 'recovered');
  return (
    <>
      <Grid.Column id="deaths">
        <Stat title="Total Deaths" today={totalDeaths} color="red" />
        <Ranking
          orderBy="deaths"
          countries={countries}
          handleClick={handleClick}
        />
      </Grid.Column>
      <Grid.Column id="confirmed">
        <Stat title="Total Confirmed" today={totalConfirmed} color="orange" />
        <Ranking
          orderBy="cases"
          countries={countries}
          handleClick={handleClick}
        />
      </Grid.Column>
      <Grid.Column id="recovered">
        <Stat title="Total Recovered" today={totalRecovered} color="green" />
        <Ranking
          orderBy="recovered"
          countries={countries}
          handleClick={handleClick}
        />
      </Grid.Column>
    </>
  );
}

export default React.memo(Overview, () => true);
