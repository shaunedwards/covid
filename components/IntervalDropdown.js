import { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

const options = [
  {
    key: 'all',
    text: 'All Time',
    value: 'all',
  },
  {
    key: 'week',
    text: 'Past Week',
    value: 7,
  },
  {
    key: 'month',
    text: 'Past Month',
    value: 30,
  },
];

export default function IntervalDropdown({ setInterval }) {
  const [initialSelected] = options;
  const [selected, setSelected] = useState(initialSelected);
  const trigger = (
    <span>
      <Icon name="history" /> {selected.text}
    </span>
  );
  function handleChange(event, input) {
    setInterval(input.value);
    setSelected(options.find((option) => option.value === input.value));
  }
  return (
    <Dropdown
      trigger={trigger}
      options={options}
      onChange={handleChange}
      style={{ float: 'right' }}
      aria-label="timeline"
      button
      basic
    />
  );
}
