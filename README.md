# EV Charging Simulation Dashboard

This project is a Vite + React application that simulates electric vehicle (EV) charging behavior. Users can enter simulation parameters and visualize various metrics (e.g., charging events, energy consumption, and power demand) across different timeframes (day, week, month, year).

## Features

- **Input Form:**
  - **Number of Charge Points:** Specify how many chargepoints are available.
  - **Arrival Probability Multiplier (20–200%, default 100%):** Adjust the likelihood of EV arrivals with a dynamic slider (which shows the current value).
  - **Consumption per Car (default: 18 kWh):** Set the energy consumption for each vehicle.
  - **Charging Power per Chargepoint (default: 11 kW):** Define the charging rate.
- **Bonus Feature – Chargepoint Configurator:**
  - Create multiple types of chargepoints (e.g., 5 × 11 kW, 3 × 22 kW, 1 × 50 kW) via a dedicated UI.
- **Output Visualization:**
  - **Exemplary Day Charts:** Hourly charging events (bar chart) and power demand (line chart) for a typical day.
  - **Aggregated Charts:** Bar charts that display aggregated metrics for week, month, and year.
  - **Dynamic Summary Metrics:** Total Charging Events, Total Energy Charged (kWh), Average Charging Duration (hrs), and Peak Power Demand (kW) update dynamically based on the selected timeframe.

## Screenshots

Screenshots of the frontend are included in the `screenshots` folder:

- **Dashboard:**  
  ![Dashboard Screenshot](screenshots/Dashboard.png)

_(Ensure the actual images are placed in the `screenshots` folder.)_

## Setup and Running the Application

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository:**

   git clone https://github.com/sahebghosh/ev-simulation.git
   cd ev-simulation

2. **Install Dependencies:**

   npm install

3. **Running the Application**

   npm run dev

4. **Running the Application**

   npm run dev

Open http://localhost:5173/ in browser.
