import React, { Dispatch, SetStateAction } from 'react';
import { SimulationOutput } from '../utils/simulationUtils';
import RechartsWrapper from './RechartsWrapper';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export type Timeframe = 'day' | 'week' | 'month' | 'year';

type Props = {
  output: SimulationOutput;
  activeTab: Timeframe;
  setActiveTab: Dispatch<SetStateAction<Timeframe>>;
};

const SimulationOutputComponent: React.FC<Props> = ({
  output,
  activeTab,
  setActiveTab,
}) => {
  const renderDayContent = () => (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2 text-[#787878]">
          Hourly Charging Events (Exemplary Day)
        </h3>
        <RechartsWrapper>
          <BarChart data={output.timeSeries}>
            <XAxis dataKey="timeSlot" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="var(--color-primary)" name="Events" />
          </BarChart>
        </RechartsWrapper>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2 text-[#787878]">
          Power Demand Over Time (Exemplary Day)
        </h3>
        <RechartsWrapper>
          <LineChart data={output.timeSeries}>
            <XAxis dataKey="timeSlot" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <CartesianGrid strokeDasharray="3 3" stroke="#D8D8D8" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="powerDemand"
              stroke="#81E6D9"
              strokeWidth={3}
              name="Power Demand"
            />
          </LineChart>
        </RechartsWrapper>
      </div>
    </>
  );

  const renderAggregatedChart = (
    title: string,
    data: any,
    barColors: { events: string; energy: string; peakPower: string }
  ) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-2 text-[#787878]">{title}</h3>
      <RechartsWrapper>
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
          <Tooltip />
          <Legend />
          <Bar dataKey="events" fill={barColors.events} name="Events" />
          <Bar dataKey="energy" fill={barColors.energy} name="Energy (kWh)" />
          <Bar
            dataKey="peakPower"
            fill={barColors.peakPower}
            name="Peak Power (kW)"
          />
        </BarChart>
      </RechartsWrapper>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'day':
        return renderDayContent();
      case 'week':
        return renderAggregatedChart(
          'Weekly Aggregated Metrics',
          output.aggregatedMetrics.weekly.chartData,
          {
            events: 'var(--color-primary)',
            energy: 'var(--color-energy)',
            peakPower: 'var(--color-peak)',
          }
        );
      case 'month':
        return renderAggregatedChart(
          'Monthly Aggregated Metrics',
          output.aggregatedMetrics.monthly.chartData,
          {
            events: 'var(--color-primary)',
            energy: 'var(--color-energy)',
            peakPower: 'var(--color-peak)',
          }
        );
      case 'year':
        return renderAggregatedChart(
          'Yearly Aggregated Metrics',
          output.aggregatedMetrics.yearly.chartData,
          {
            events: 'var(--color-primary)',
            energy: 'var(--color-energy)',
            peakPower: 'var(--color-peak)',
          }
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Tab Controls */}
      <div className="flex space-x-4 mb-4">
        {(['day', 'week', 'month', 'year'] as Timeframe[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-primary text-white font-semibold'
                : 'bg-gray-200 font-semibold hover:bg-primary hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default SimulationOutputComponent;
