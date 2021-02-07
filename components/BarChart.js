import { Bar } from 'react-chartjs-2';

export default function BarChart({ data, title }) {
  return (
    <Bar
      data={data}
      options={{
        // maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        title: {
          display: true,
          text: title,
          fontSize: 20,
          fontColor: 'black',
          fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
        },
        tooltips: {
          callbacks: {
            label(tooltip) {
              return tooltip.yLabel.toLocaleString();
            },
          },
        },
        legend: {
          display: false,
        },
        layout: {
          padding: 25,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                // precision: 0,
                callback(value) {
                  return Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(value);
                },
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  );
}
