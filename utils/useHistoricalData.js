import { useState, useEffect } from 'react';

export default function useHistoricalData(country) {
  const [cases, setCases] = useState();
  const [deaths, setDeaths] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState('all');

  function transformData(
    data,
    backgroundColor,
    borderColor,
    linearScale = true
  ) {
    const slice = parseInt(-interval) || 0;
    return {
      labels: Object.keys(data)
        .slice(slice)
        .map((key) =>
          new Date(key).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })
        ),
      datasets: [
        {
          borderColor,
          backgroundColor,
          borderWidth: 0.5,
          lineTension: 0,
          pointHoverBorderColor: false,
          data: linearScale
            ? Object.keys(data)
                .slice(slice)
                .map((key) => data[key])
            : Object.keys(data)
                .slice(slice)
                .map((key) => {
                  const current = new Date(key);
                  const previous = new Date(current);
                  previous.setDate(current.getDate() - 1);
                  const prevKey = previous.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit',
                  });
                  let difference;
                  if (data[prevKey]) {
                    difference = data[key] - data[prevKey];
                  } else {
                    difference = data[key];
                  }
                  return difference;
                }),
        },
      ],
    };
  }

  useEffect(() => {
    async function fetchDataForCountry() {
      setLoading(true);
      // remember to fetch one day more than requested to calculate daily difference
      const lastdays = parseInt(interval) + 1 || interval;
      const response = await fetch(
        `https://disease.sh/v3/covid-19/historical/${country.country}?lastdays=${lastdays}`
      );
      const data = await response.json();
      if (response.ok) {
        const totalCases = transformData(
          data.timeline.cases,
          'rgba(137, 196, 244, 0.5)',
          'rgba(34, 167, 240, 1)'
        );
        const totalDeaths = transformData(
          data.timeline.deaths,
          'rgba(241, 130, 141, 0.5)',
          'rgba(246, 71, 71, 1)'
        );
        const dailyCases = transformData(
          data.timeline.cases,
          'rgba(137, 196, 244, 0.5)',
          'rgba(34, 167, 240, 1)',
          false
        );
        const dailyDeaths = transformData(
          data.timeline.deaths,
          'rgba(241, 130, 141, 0.5)',
          'rgba(246, 71, 71, 1)',
          false
        );
        const casesDataset = {
          total: totalCases,
          daily: dailyCases,
        };
        const deathsDataset = {
          total: totalDeaths,
          daily: dailyDeaths,
        };
        setCases(casesDataset);
        setDeaths(deathsDataset);
      } else {
        setError(data.message);
      }
      setLoading(false);
    }
    fetchDataForCountry();
  }, [country, interval]);

  return {
    cases,
    deaths,
    error,
    loading,
    setInterval,
  };
}
