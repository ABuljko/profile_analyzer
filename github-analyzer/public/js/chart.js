if (typeof langData !== "undefined" && Object.keys(langData).length > 0) {
  const ctx = document.getElementById('langChart').getContext('2d');
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
      responsive: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
