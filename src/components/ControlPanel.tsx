import React from 'react';
import { useMatchStore } from '../stores/matchStore';

const RUNS_OPTIONS = [0, 1, 2, 3, 4, 6];

export const ControlPanel: React.FC = () => {
  const { addRuns, addWicket } = useMatchStore();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {RUNS_OPTIONS.map((runs) => (
          <button
            key={runs}
            onClick={() => addRuns(runs)}
            className={`p-4 rounded-full text-xl font-bold ${
              runs === 4 || runs === 6
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {runs}
          </button>
        ))}
      </div>
      <button
        onClick={addWicket}
        className="w-full p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xl font-bold transition-colors"
      >
        OUT
      </button>
    </div>
  );
};