import Link from 'next/link';
import { Button, Dropdown, Grid, Icon, Label } from 'semantic-ui-react';

import Stat from './Stat';

export default function Search({ countries, selected, handleChange }) {
  return (
    <Grid.Column>
      <Dropdown
        fluid
        search
        selection
        value={selected.country}
        options={countries}
        onChange={handleChange}
        aria-label="search"
        closeOnBlur
        lazyLoad
      />
      <div style={{ margin: '1em 0' }}>
        <Label ribbon size="large" color="blue">
          Last updated: {new Date(selected.updated).toLocaleString()}
        </Label>
      </div>
      <Stat
        title="Deaths"
        today={selected.deaths}
        yesterday={selected.yesterday?.deaths}
      />
      <Stat
        title="Total cases"
        today={selected.cases}
        yesterday={selected.yesterday?.cases}
      />
      <Stat
        title="Active cases"
        today={selected.active}
        yesterday={selected.yesterday?.active}
      />
      <Stat
        title="Recovered"
        today={selected.recovered}
        yesterday={selected.yesterday?.recovered}
      />
      <Stat
        title="Tests carried out"
        today={selected.tests}
        yesterday={selected.yesterday?.tests}
      />
      <Link href={`/country/${selected.country}`}>
        <Button fluid primary>
          <Icon name="line graph" style={{ marginRight: 10 }} />
          View Historical Data
        </Button>
      </Link>
    </Grid.Column>
  );
}
