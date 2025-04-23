// MQTT Status Simulated
document.addEventListener("DOMContentLoaded", () => {
    const mqttStatus = document.getElementById("mqttStatus");
    const deviceStatus = document.getElementById("deviceStatus");
    const lastPing = document.getElementById("lastPing");
    const uptime = document.getElementById("uptime");
  
    setTimeout(() => {
      mqttStatus.textContent = "Connected ✅";
      mqttStatus.style.color = "#28a745";
  
      deviceStatus.textContent = "Online 🟢";
      deviceStatus.style.color = "#28a745";
  
      const now = new Date();
      lastPing.textContent = now.toLocaleTimeString();
    }, 1500);
  
    // Fake uptime timer
    let seconds = 0;
    setInterval(() => {
      seconds++;
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      uptime.textContent = `${hrs}h ${mins}m ${secs}s`;
    }, 1000);
  });
  