import React, { useState } from 'react';
import InputForm, { SimulationParams } from '../components/InputForm';
import ChargepointConfigurator, {
  ChargepointGroup,
} from '../components/ChargepointConfigurator';
import SummaryMetrics from '../components/SummaryMetrics';
import SimulationOutputComponent from '../components/SimulationOutput';
import { simulateData, SimulationOutput } from '../utils/simulationUtils';

// Timeframes type
export type Timeframe = 'day' | 'week' | 'month' | 'year';

const Dashboard: React.FC = () => {
  const [simulationOutput, setSimulationOutput] =
    useState<SimulationOutput | null>(null);
  const [chargepointGroups, setChargepointGroups] = useState<
    ChargepointGroup[]
  >([]);
  const [activeTab, setActiveTab] = useState<Timeframe>('day');

  const handleSimulationSubmit = (params: SimulationParams) => {
    const output = simulateData(params);
    setSimulationOutput(output);
    setActiveTab('day');
  };

  return (
    <main className="container mx-auto p-4 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Input Form, Chargepoint Configurator, and Summary Metrics */}
        <div className="md:col-span-1 space-y-4">
          <InputForm onSubmit={handleSimulationSubmit} />

          {simulationOutput && (
            <SummaryMetrics output={simulationOutput} activeTab={activeTab} />
          )}
          <ChargepointConfigurator
            groups={chargepointGroups}
            onChange={setChargepointGroups}
          />
        </div>
        {/* Right Column: Graphs */}
        <div className="md:col-span-2">
          {simulationOutput ? (
            <SimulationOutputComponent
              output={simulationOutput}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <div className="bg-white p-4 text-center flex flex-col items-center justify-center h-full">
              <img
                src="/images/Car.png"
                alt="EV Charger"
                className="w-2/3 max-w-sm"
              />
              <h2 className="text-xl font-semibold mb-2">
                Welcome to EV Simulator
              </h2>
              <p className="text-gray-500">
                Please fill in the parameters on the left to see your charging
                data visualized here.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
