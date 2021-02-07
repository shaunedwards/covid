import Image from 'next/image';
import { List } from 'semantic-ui-react';
import getRelativeFlagPath from '../utils/getRelativeFlagPath';

export default function Ranking({ countries, orderBy, handleClick }) {
  const sortedCountries = [...countries].sort(
    (a, b) => b[orderBy] - a[orderBy]
  );
  return (
    <List
      divided
      relaxed
      size="large"
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      {sortedCountries.map((country) => (
        <List.Item
          key={country.country}
          onClick={() => handleClick(country.country)}
          style={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <Image
            width={50}
            height={36}
            className="flag-large"
            alt={country.country}
            src={getRelativeFlagPath(country)}
          />
          <List.Content style={{ marginLeft: 10 }}>
            <List.Header>{country.country}</List.Header>
            <List.Description>
              {country[orderBy].toLocaleString()}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}
