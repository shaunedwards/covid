import { Line } from 'react-chartjs-2';

export default function LineChart({ data, title }) {
  return (
    <Line
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
                callback(value) {
                  return Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(value);
                },
                // beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  );
}
