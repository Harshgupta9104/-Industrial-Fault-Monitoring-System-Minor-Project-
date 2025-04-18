const options = {
    connectTimeout: 4000,
    clientId: 'dashboard_' + Math.random().toString(16).substr(2, 8),
    keepalive: 60,
    clean: true,
  };
  
  const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', options);
  
  const topics = {
    temp: '/factory/temp',
    humidity: '/factory/humidity',
    motion: '/factory/motion',
    gas: '/factory/gas',
    flame: '/factory/flame',
    alert: '/factory/alert',
  };
  
  // DOM Elements
  const tempEl = document.getElementById('temp');
  const humidityEl = document.getElementById('humidity');
  const motionEl = document.getElementById('motion');
  const gasEl = document.getElementById('gas');
  const flameEl = document.getElementById('flame');
  const alertEl = document.getElementById('alert');
  
  // -------------------- Chart Setup --------------------
  const tempData = [];
  const humidityData = [];
  
  const tempChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Temperature (°C)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
        tension: 0.3,
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { display: false },
        y: { beginAtZero: true },
      }
    }
  });
  
  const humidityChart = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: ['Humidity'],
      datasets: [{
        label: '%',
        backgroundColor: 'rgb(54, 162, 235)',
        data: [0]
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, max: 100 },
      }
    }
  });
  
  const pieChart = new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: ['Motion', 'Flame', 'Gas'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb'],
      }]
    },
    options: {
      responsive: true,
    }
  });
  
  const gaugeCtx = document.getElementById('gaugeChart').getContext('2d');
  const gaugeChart = new Chart(gaugeCtx, {
    type: 'doughnut',
    data: {
      labels: ['Gas Level', 'Remaining'],
      datasets: [{
        data: [0, 100],
        backgroundColor: ['#ff6384', '#e0e0e0'],
        borderWidth: 0
      }]
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: '70%',
      plugins: {
        legend: { display: false }
      }
    }
  });
  
  // ------------------ MQTT Logic ------------------
  client.on('connect', () => {
    console.log('✅ Connected to MQTT Broker');
    Object.values(topics).forEach(topic => client.subscribe(topic));
  });
  
  let pieValues = { motion: 0, flame: 0, gas: 0 };
  
  client.on('message', (topic, message) => {
    const value = message.toString();
    const timestamp = new Date().toLocaleTimeString();
  
    switch (topic) {
      case topics.temp:
        tempEl.textContent = value;
        tempChart.data.labels.push(timestamp);
        tempChart.data.datasets[0].data.push(parseFloat(value));
        if (tempChart.data.labels.length > 10) {
          tempChart.data.labels.shift();
          tempChart.data.datasets[0].data.shift();
        }
        tempChart.update();
        break;
  
      case topics.humidity:
        humidityEl.textContent = value;
        humidityChart.data.datasets[0].data[0] = parseFloat(value);
        humidityChart.update();
        break;
  
      case topics.motion:
        motionEl.textContent = value === '1' ? 'Detected' : 'None';
        pieValues.motion = parseInt(value);
        updatePie();
        break;
  
      case topics.gas:
        gasEl.textContent = value;
        pieValues.gas = parseFloat(value) > 300 ? 1 : 0; // example threshold
        gaugeChart.data.datasets[0].data = [parseFloat(value), 100 - parseFloat(value)];
        gaugeChart.update();
        updatePie();
        break;
  
      case topics.flame:
        flameEl.textContent = value === '1' ? '🔥 Detected' : 'None';
        pieValues.flame = parseInt(value);
        updatePie();
        break;
  
      case topics.alert:
        alertEl.textContent = value !== '0' ? value : 'None';
        break;
    }
  });
  
  function updatePie() {
    pieChart.data.datasets[0].data = [pieValues.motion, pieValues.flame, pieValues.gas];
    pieChart.update();
  }
  