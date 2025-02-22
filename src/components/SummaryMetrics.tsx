import React from 'react';
import { SimulationOutput } from '../utils/simulationUtils';
import { Timeframe } from '../pages/Dashboard';

type Props = {
  output: SimulationOutput;
  activeTab: Timeframe;
};

const SummaryMetrics: React.FC<Props> = ({ output, activeTab }) => {
  // Based on activeTab decide which aggregated metrics to show
  let totalEvents = output.totalChargingEvents;
  let totalEnergy = output.totalEnergyCharged;
  let averageDuration = output.averageChargingDuration;
  let peakPower = output.peakPowerDemand;

  switch (activeTab) {
    case 'day':
      totalEvents = output.aggregatedMetrics.daily.totalEvents;
      totalEnergy = output.aggregatedMetrics.daily.totalEnergy;
      averageDuration = output.aggregatedMetrics.daily.averageChargingDuration;
      peakPower = output.aggregatedMetrics.daily.peakPower;
      break;
    case 'week':
      totalEvents = output.aggregatedMetrics.weekly.totalEvents;
      totalEnergy = output.aggregatedMetrics.weekly.totalEnergy;
      averageDuration = output.aggregatedMetrics.weekly.averageChargingDuration;
      peakPower = output.aggregatedMetrics.weekly.peakPower;
      break;
    case 'month':
      totalEvents = output.aggregatedMetrics.monthly.totalEvents;
      totalEnergy = output.aggregatedMetrics.monthly.totalEnergy;
      averageDuration =
        output.aggregatedMetrics.monthly.averageChargingDuration;
      peakPower = output.aggregatedMetrics.monthly.peakPower;
      break;
    case 'year':
      totalEvents = output.aggregatedMetrics.yearly.totalEvents;
      totalEnergy = output.aggregatedMetrics.yearly.totalEnergy;
      averageDuration = output.aggregatedMetrics.yearly.averageChargingDuration;
      peakPower = output.aggregatedMetrics.yearly.peakPower;
      break;
    default:
      break;
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded shadow ">
        <p className="text-gray-400">Total Charging Events</p>
        <p className="text-2xl font-bold">{totalEvents.toFixed(0)}</p>
      </div>
      <div className="p-4 border border-gray-200 rounded shadow ">
        <p className="text-gray-400">Total Energy Charged (kWh)</p>
        <p className="text-2xl font-bold">{totalEnergy.toFixed(2)}</p>
      </div>
      <div className="p-4 border border-gray-200 rounded shadow">
        <p className="text-gray-400">Avg Charging Duration (hrs)</p>
        <p className="text-2xl font-bold ">{averageDuration.toFixed(2)}</p>
      </div>
      <div className="p-4 border border-gray-200 rounded shadow">
        <p className="text-gray-400">Peak Power Demand (kW)</p>
        <p className="text-2xl font-bold">{peakPower.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SummaryMetrics;
