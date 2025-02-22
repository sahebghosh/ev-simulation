import React, { useState } from 'react';

export type ChargepointGroup = {
  count: number;
  power: number;
};

type Props = {
  groups: ChargepointGroup[];
  onChange: (groups: ChargepointGroup[]) => void;
};

const ChargepointConfigurator: React.FC<Props> = ({ groups, onChange }) => {
  const [countInput, setCountInput] = useState<string>('');
  const [powerInput, setPowerInput] = useState<string>('');

  const addGroup = () => {
    const count = Number(countInput);
    const power = Number(powerInput);
    if (count > 0 && power > 0) {
      const newGroups = [...groups, { count, power }];
      onChange(newGroups);
      setCountInput('');
      setPowerInput('');
    }
  };

  const removeGroup = (index: number) => {
    const newGroups = groups.filter((_, i) => i !== index);
    onChange(newGroups);
  };

  return (
    <div className="p-4 bg-white rounded shadow border border-gray-200 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Chargepoint Configurator
      </h3>
      <div className="flex space-x-2 mb-2">
        <input
          type="number"
          value={countInput}
          onChange={(e) => setCountInput(e.target.value)}
          placeholder="Count"
          className="border border-gray-300 p-2 rounded w-1/3"
        />
        <input
          type="number"
          value={powerInput}
          onChange={(e) => setPowerInput(e.target.value)}
          placeholder="Power (kW)"
          className="border border-gray-300 p-2 rounded w-1/3"
        />
        <button
          onClick={addGroup}
          className="bg-primary hover:bg-secondary text-white font-semibold p-2 rounded w-1/3"
        >
          Add
        </button>
      </div>
      {groups.length > 0 && (
        <ul className="space-y-1">
          {groups.map((group, index) => (
            <li
              key={index}
              className="flex justify-between items-center border border-gray-200 p-2 rounded"
            >
              <span>
                {group.count} × {group.power} kW
              </span>
              <button
                onClick={() => removeGroup(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChargepointConfigurator;
