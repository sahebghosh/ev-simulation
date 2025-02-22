import { SimulationParams } from '../components/InputForm';

export type TimeSlotData = {
  timeSlot: string;
  events: number;
  energyCharged: number;
  concurrentSessions: number;
  powerDemand: number;
};

export type AggregatedChartData = {
  label: string;
  events: number;
  energy: number;
  peakPower: number;
};

export type AggregatedMetrics = {
  totalEvents: number;
  totalEnergy: number;
  peakPower: number;
  averageChargingDuration: number;
  chartData?: AggregatedChartData[];
};

export type SimulationOutput = {
  totalEnergyCharged: number;
  totalChargingEvents: number;
  averageChargingDuration: number;
  peakPowerDemand: number;
  timeSeries: TimeSlotData[];
  aggregatedMetrics: {
    daily: AggregatedMetrics;
    weekly: AggregatedMetrics;
    monthly: AggregatedMetrics;
    yearly: AggregatedMetrics;
  };
};

const BASE_ARRIVAL_RATE = 1; // events per hour per chargepoint

// Returns a multiplier based on hour to simulate peak/off-peak variations.
const getTimeSlotFactor = (hour: number): number => {
  if (hour >= 12 && hour < 14) {
    return 1.5;
  } else if ((hour >= 0 && hour < 6) || (hour >= 22 && hour < 24)) {
    return 0.7;
  }
  return 1.0;
};

// Introduce a random variation of ±10%
const randomVariation = (value: number): number => {
  return value * (0.9 + Math.random() * 0.2);
};

export const simulateData = (params: SimulationParams): SimulationOutput => {
  const {
    numberOfChargePoints,
    arrivalProbabilityMultiplier,
    consumptionPerCar,
    chargingPowerPerChargepoint,
  } = params;

  // Calculating charging duration per event.
  // This is a fundamental electrical relationship: Duration = Energy / Power.
  const chargingDuration = consumptionPerCar / chargingPowerPerChargepoint;

  let totalEvents = 0;
  const timeSeries: TimeSlotData[] = [];

  // Simulate 24 hours for an exemplary day.
  for (let hour = 0; hour < 24; hour++) {
    const timeSlot = `${hour}:00-${hour + 1}:00`;
    const timeFactor = getTimeSlotFactor(hour);

    // Calculating events using base rate, multiplier, and time factor.
    const events =
      numberOfChargePoints *
      BASE_ARRIVAL_RATE *
      (arrivalProbabilityMultiplier / 100) *
      timeFactor;
    const concurrentSessions = Math.min(
      Math.ceil(events / 4),
      numberOfChargePoints
    );
    const energyCharged = events * consumptionPerCar;
    const powerDemand = concurrentSessions * chargingPowerPerChargepoint;

    totalEvents += events;
    timeSeries.push({
      timeSlot,
      events,
      energyCharged,
      concurrentSessions,
      powerDemand,
    });
  }

  const totalEnergyCharged = totalEvents * consumptionPerCar;
  const dailyPeakPower = Math.max(
    ...timeSeries.map((slot) => slot.powerDemand)
  );

  // Daily aggregated metrics.
  // Average Charging Duration here is the same as for each event, because it is defined by the ratio consumption per car / charging power.
  const dailyMetrics: AggregatedMetrics = {
    totalEvents,
    totalEnergy: totalEnergyCharged,
    peakPower: dailyPeakPower,
    averageChargingDuration: chargingDuration,
  };

  // Weekly aggregated metrics with chart data for 7 days.
  const weeklyChartData: AggregatedChartData[] = Array.from(
    { length: 7 },
    (_, i) => ({
      label: `Day ${i + 1}`,
      events: randomVariation(totalEvents),
      energy: randomVariation(totalEnergyCharged),
      peakPower: randomVariation(dailyPeakPower),
    })
  );
  const weeklyMetrics: AggregatedMetrics = {
    totalEvents: dailyMetrics.totalEvents * 7,
    totalEnergy: dailyMetrics.totalEnergy * 7,
    peakPower: dailyMetrics.peakPower,
    // For simplicity, we use the daily average for weekly aggregation.
    averageChargingDuration: dailyMetrics.averageChargingDuration,
    chartData: weeklyChartData,
  };

  // Monthly aggregated metrics with chart data for 30 days.
  const monthlyChartData: AggregatedChartData[] = Array.from(
    { length: 30 },
    (_, i) => ({
      label: `Day ${i + 1}`,
      events: randomVariation(totalEvents),
      energy: randomVariation(totalEnergyCharged),
      peakPower: randomVariation(dailyPeakPower),
    })
  );
  const monthlyMetrics: AggregatedMetrics = {
    totalEvents: dailyMetrics.totalEvents * 30,
    totalEnergy: dailyMetrics.totalEnergy * 30,
    peakPower: dailyMetrics.peakPower,
    averageChargingDuration: dailyMetrics.averageChargingDuration,
    chartData: monthlyChartData,
  };

  // Yearly aggregated metrics with chart data for 12 months.
  const yearlyChartData: AggregatedChartData[] = Array.from(
    { length: 12 },
    (_, i) => ({
      label: new Date(0, i).toLocaleString('default', { month: 'short' }),
      events: randomVariation(dailyMetrics.totalEvents * 30), // approximate monthly events
      energy: randomVariation(dailyMetrics.totalEnergy * 30),
      peakPower: dailyMetrics.peakPower,
    })
  );
  const yearlyMetrics: AggregatedMetrics = {
    totalEvents: dailyMetrics.totalEvents * 365,
    totalEnergy: dailyMetrics.totalEnergy * 365,
    peakPower: dailyMetrics.peakPower,
    averageChargingDuration: dailyMetrics.averageChargingDuration,
    chartData: yearlyChartData,
  };

  return {
    totalEnergyCharged,
    totalChargingEvents: totalEvents,
    averageChargingDuration: chargingDuration,
    peakPowerDemand: dailyPeakPower,
    timeSeries,
    aggregatedMetrics: {
      daily: dailyMetrics,
      weekly: weeklyMetrics,
      monthly: monthlyMetrics,
      yearly: yearlyMetrics,
    },
  };
};
