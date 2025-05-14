if (typeof langData !== "undefined" && Object.keys(langData).length > 0) {
  const ctx = document.getElementById('langChart').getContext('2d');

  const total = Object.values(langData).reduce((a, b) => a + b, 0);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(langData),
      datasets: [{
        data: Object.values(langData),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        datalabels: {
          color: '#fff',
          formatter: (value) => {
            const percentage = (value / total) * 100;
            return percentage.toFixed(1) + '%';
          },
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}
