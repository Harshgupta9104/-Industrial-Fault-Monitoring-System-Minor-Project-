# Industrial Fault Monitoring System

An **IoT-based Industrial Fault Monitoring System** designed to detect and report environmental and safety hazards in real-time using a range of sensors connected to a NodeMCU (ESP8266). Faults such as abnormal motion, gas leaks, high temperature, or fire are reported with a buzzer, LED alerts, and sent to a real-time dashboard via MQTT.

## 🚀 Features

- 🔥 Fire detection using a Flame Sensor
- 🌡️ Temperature & humidity monitoring via DHT22
- 🏃 Motion detection with PIR Sensor
- ☠️ Harmful gas detection using MQ135
- 📶 Real-time data transmission using MQTT protocol
- 💡 Visual & audio alerts via LED and buzzer
- 🌐 Web-based dashboard for live monitoring

## 📦 Components Used

| Component         | Description                      |
|------------------|----------------------------------|
| NodeMCU ESP8266  | Wi-Fi microcontroller            |
| Flame Sensor     | Fire/flame detection             |
| DHT22 Sensor     | Temperature & Humidity sensing   |
| PIR Sensor       | Motion detection                 |
| MQ135 Gas Sensor | Air quality / gas detection      |
| Passive Buzzer   | Audible fault alert              |
| Red LED          | Visual fault alert               |
| MQTT Broker      | Handles real-time communication  |

## 🛠️ How It Works

1. Sensors monitor environmental parameters continuously.
2. On detecting any abnormal condition (e.g., gas leak, high temp, fire, or motion):
   - The system triggers a **buzzer** and **flashing red LED**.
   - Data is published to an MQTT broker.
3. A **dashboard** subscribed to MQTT topics shows real-time data and fault alerts.

## 🖥️ Dashboard Integration

- Developed using a web-based interface.
- Subscribes to MQTT topics from NodeMCU.
- Displays temperature, humidity, motion status, gas level, and fire alert.
- Highlights active faults.

## 🔧 Setup Instructions

1. **Hardware Connections**
   - Connect all sensors to NodeMCU's GPIO pins.
   - Attach buzzer and LED to designated output pins.

2. **Firmware**
   - Program NodeMCU using Arduino IDE or PlatformIO.
   - Use libraries like:
     - `DHT.h`
     - `PubSubClient.h`
     - `ESP8266WiFi.h`

3. **MQTT Configuration**
   - Use public broker like `broker.hivemq.com` or setup your own (e.g., Mosquitto).
   - Set unique topic names for each sensor value.

4. **Dashboard**
   - Use HTML/JS + MQTT.js for live updates.
   - Subscribe to the same topics published by NodeMCU.

## 📊 Sample MQTT Topics

| Topic                    | Description             |
|--------------------------|-------------------------|
| `/factory/temp`          | Temperature data        |
| `/factory/humidity`      | Humidity data           |
| `/factory/motion`        | Motion detection status |
| `/factory/gas`           | Gas sensor value        |
| `/factory/flame`         | Flame detection         |
| `/factory/alert`         | General fault alerts    |

## ⚠️ Fault Conditions

| Fault Type        | Trigger Condition                     |
|-------------------|----------------------------------------|
| Gas Leak          | MQ135 value above threshold            |
| Fire Alert        | Flame sensor detects fire              |
| High Temperature  | Temp > set limit (e.g., 40°C)          |
| Unauthorized Entry| Motion detected during off-hours       |

## 📷 Screenshots

*(Add screenshots of your circuit and dashboard UI here)*

## 🧠 Future Improvements

- Email/SMS alert system
- Logging & analytics
- Mobile app integration
- Automatic shutdown mechanism

## 📜 License

This project is open-source and free to use under the MIT License.

---

> Made with ❤️ for safer industrial environments.
