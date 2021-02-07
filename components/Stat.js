import { Statistic, Divider, Label, Icon } from 'semantic-ui-react';

export default function Stat({ title, today, yesterday, color }) {
  const change = today - yesterday;
  const positiveStats = ['Recovered', 'Tests carried out'];
  function getColor() {
    if (!change) return;
    if (change > 0 && !positiveStats.some((stat) => title.includes(stat))) {
      return 'red';
    }
    return 'green';
  }
  function getIcon() {
    if (!change) return;
    if (change > 0) {
      return <Icon name="caret up" style={{ marginRight: '0.5em' }} />;
    }
    return <Icon name="caret down" style={{ marginRight: '0.5em' }} />;
  }
  return (
    <div style={{ textAlign: 'center' }} className="stat">
      <Statistic color={color} size="small">
        <Statistic.Label>{title}</Statistic.Label>
        <Statistic.Value>{today.toLocaleString()}</Statistic.Value>
      </Statistic>
      {yesterday >= 0 ? (
        <Label
          size="tiny"
          title="Change since yesterday"
          color={getColor()}
          style={{ display: 'block', width: '80px', margin: '0 auto 1em auto' }}
        >
          {getIcon()}
          {Math.abs(change).toLocaleString()}
        </Label>
      ) : null}
      <Divider style={{ marginTop: 0 }} />
    </div>
  );
}
