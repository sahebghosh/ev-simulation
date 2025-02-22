import React, { useState } from 'react';

export type SimulationParams = {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier: number;
  consumptionPerCar: number;
  chargingPowerPerChargepoint: number;
};

type Props = {
  onSubmit: (params: SimulationParams) => void;
};

type FormValues = {
  numberOfChargePoints: string;
  arrivalProbabilityMultiplier: number;
  consumptionPerCar: string;
  chargingPowerPerChargepoint: string;
};

const InputForm: React.FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<FormValues>({
    numberOfChargePoints: '',
    arrivalProbabilityMultiplier: 100,
    consumptionPerCar: '',
    chargingPowerPerChargepoint: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (
      !values.numberOfChargePoints ||
      Number(values.numberOfChargePoints) <= 0
    ) {
      newErrors.numberOfChargePoints = 'Please enter a number greater than 0.';
    }
    if (
      values.arrivalProbabilityMultiplier < 20 ||
      values.arrivalProbabilityMultiplier > 200
    ) {
      newErrors.arrivalProbabilityMultiplier =
        'Multiplier must be between 20 and 200.';
    }
    if (!values.consumptionPerCar || Number(values.consumptionPerCar) <= 0) {
      newErrors.consumptionPerCar = 'Please enter a value greater than 0.';
    }
    if (
      !values.chargingPowerPerChargepoint ||
      Number(values.chargingPowerPerChargepoint) <= 0
    ) {
      newErrors.chargingPowerPerChargepoint =
        'Please enter a value greater than 0.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'range' ? Number(value) : value;
    setValues((prev) => ({ ...prev, [name]: newValue }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === 'numberOfChargePoints' && Number(newValue) > 0) {
        delete newErrors.numberOfChargePoints;
      }
      if (
        name === 'arrivalProbabilityMultiplier' &&
        Number(newValue) >= 20 &&
        Number(newValue) <= 200
      ) {
        delete newErrors.arrivalProbabilityMultiplier;
      }
      if (name === 'consumptionPerCar' && Number(newValue) > 0) {
        delete newErrors.consumptionPerCar;
      }
      if (name === 'chargingPowerPerChargepoint' && Number(newValue) > 0) {
        delete newErrors.chargingPowerPerChargepoint;
      }
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const params: SimulationParams = {
        numberOfChargePoints: Number(values.numberOfChargePoints),
        arrivalProbabilityMultiplier: values.arrivalProbabilityMultiplier,
        consumptionPerCar: Number(values.consumptionPerCar),
        chargingPowerPerChargepoint: Number(values.chargingPowerPerChargepoint),
      };
      onSubmit(params);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow border border-gray-200"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Charge Points
        </label>
        <input
          type="number"
          name="numberOfChargePoints"
          value={values.numberOfChargePoints}
          onChange={handleChange}
          placeholder="Enter number of charge points"
          className="border border-gray-200 p-2 mt-1 w-full rounded"
        />
        {errors.numberOfChargePoints && (
          <p className="text-red-500 text-xs mt-1">
            {errors.numberOfChargePoints}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Arrival Probability Multiplier
        </label>
        <div className="relative w-full mt-2">
          <input
            type="range"
            name="arrivalProbabilityMultiplier"
            value={values.arrivalProbabilityMultiplier}
            onChange={handleChange}
            min={20}
            max={200}
            className="w-full"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${
                ((Number(values.arrivalProbabilityMultiplier) - 20) / 180) * 100
              }%, #d1d5db ${
                ((Number(values.arrivalProbabilityMultiplier) - 20) / 180) * 100
              }%, #d1d5db 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>20%</span>
            <span>200%</span>
          </div>
          <div
            className="absolute -top-8"
            style={{
              left: `${
                ((Number(values.arrivalProbabilityMultiplier) - 20) / 180) * 100
              }%`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded text-xs">
              {values.arrivalProbabilityMultiplier}%
            </span>
          </div>
        </div>
        {errors.arrivalProbabilityMultiplier && (
          <p className="text-red-500 text-xs mt-1">
            {errors.arrivalProbabilityMultiplier}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Consumption per Car (kWh)
        </label>
        <input
          type="number"
          name="consumptionPerCar"
          value={values.consumptionPerCar}
          onChange={handleChange}
          placeholder="Enter consumption (e.g., 18)"
          className="border border-gray-200 p-2 mt-1 w-full rounded"
        />
        {errors.consumptionPerCar && (
          <p className="text-red-500 text-xs mt-1">
            {errors.consumptionPerCar}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Charging Power per Chargepoint (kW)
        </label>
        <input
          type="number"
          name="chargingPowerPerChargepoint"
          value={values.chargingPowerPerChargepoint}
          onChange={handleChange}
          placeholder="Enter charging power (e.g., 11)"
          className="border border-gray-200 p-2 mt-1 w-full rounded"
        />
        {errors.chargingPowerPerChargepoint && (
          <p className="text-red-500 text-xs mt-1">
            {errors.chargingPowerPerChargepoint}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-secondary text-white p-2 rounded w-full font-semibold"
      >
        Simulate
      </button>
    </form>
  );
};

export default InputForm;
