function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");
  const lightSheet = document.getElementById("themeStylesheet");
  const darkSheet = document.getElementById("darkThemeStylesheet");

  const isDark = body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme", !isDark);

  // Apply correct stylesheet
  lightSheet.disabled = isDark;
  darkSheet.disabled = !isDark;

  // Toggle icon between sun and moon
  icon.classList.toggle("fa-sun", !isDark);
  icon.classList.toggle("fa-moon", isDark);

  // Add rotation animation
  document.querySelector(".theme-toggle").classList.add("spin");
  setTimeout(() => document.querySelector(".theme-toggle").classList.remove("spin"), 500);

  // Store theme in localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// ===== MQTT SETUP =====
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "clientId-" + Math.random());
client.onMessageArrived = onMessageArrived;
client.onConnectionLost = (responseObject) => console.log("Connection lost:", responseObject);

client.connect({ onSuccess: onConnect });

function onConnect() {
  console.log("MQTT connected ✅");
  const topics = ["/factory/temp", "/factory/humidity", "/factory/gas", "/factory/fault"];
  topics.forEach(topic => client.subscribe(topic));
}

// ====== Chart.js INIT ======
const tempChart = new Chart(document.getElementById("tempChart"), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: "Temperature (°C)",
      data: [],
      borderColor: "#007bff",
      backgroundColor: "rgba(0,123,255,0.1)",
      fill: true,
      tension: 0.4
    }]
  },
  options: { responsive: true }
});

const humidityChart = new Chart(document.getElementById("humidityChart"), {
  type: 'bar',
  data: {
    labels: ["Humidity"],
    datasets: [{
      label: "%",
      data: [0],
      backgroundColor: "#00bfa6"
    }]
  },
  options: { responsive: true, indexAxis: 'y' }
});

const gasGauge = new Chart(document.getElementById("gasGauge"), {
  type: 'doughnut',
  data: {
    labels: ["Gas", "Remaining"],
    datasets: [{
      data: [0, 100],
      backgroundColor: ["#00c853", "#eee"],
      borderWidth: 0
    }]
  },
  options: {
    circumference: 180,
    rotation: -90,
    cutout: "80%",
    plugins: { legend: { display: false } }
  }
});

// ====== DATA HANDLING ======
let humidityVal = 0;
let gasVal = 0;

function onMessageArrived(message) {
  const topic = message.destinationName;
  const payload = message.payloadString;

  if (topic === "/factory/temp") {
    const temp = parseFloat(payload);
    updateChart(tempChart, temp);
    updateText("tempVal", temp + " °C");
  }

  if (topic === "/factory/humidity") {
    humidityVal = parseFloat(payload);
    humidityChart.data.datasets[0].data = [humidityVal];
    humidityChart.update();
    updateText("pressureVal", humidityVal + " %");
  }

  if (topic === "/factory/gas") {
    gasVal = parseInt(payload);
    gasGauge.data.datasets[0].data = [gasVal, 100 - gasVal];
    gasGauge.update();
    updateText("vibrationVal", gasVal);
  }

  if (topic === "/factory/fault") {
    const isFault = payload === "1" || payload.toLowerCase() === "true";
    updateText("faultVal", isFault ? "FAULT ⚠️" : "Normal");
    toggleFaultFlash(isFault);
  }
}

function updateChart(chart, value) {
  const now = new Date().toLocaleTimeString();
  chart.data.labels.push(now);
  chart.data.datasets[0].data.push(value);
  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

function updateText(id, text) {
  document.getElementById(id).textContent = text;
}

// ====== FAULT FLASH ======
function toggleFaultFlash(show) {
  const flash = document.getElementById("faultFlashCard");
  flash.style.display = show ? "block" : "none";
}

