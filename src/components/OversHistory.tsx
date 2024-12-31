import React from 'react';
import { useMatchStore } from '../stores/matchStore';

export const OversHistory: React.FC = () => {
  const { matchHistory, currentInnings, overs } = useMatchStore((state) => ({
    matchHistory: state.matchHistory,
    currentInnings: state.currentInnings,
    overs: state.overs,
  }));

  const getInningsOvers = (inningsIndex: number) => {
    // Use `overs` for the ongoing innings to ensure real-time updates
    if (inningsIndex === 0 && currentInnings === 1) {
      return overs || []; // Live overs for first innings
    }
    if (inningsIndex === 1 && currentInnings === 2) {
      return overs || []; // Live overs for second innings
    }
    return matchHistory[inningsIndex]?.overs || []; // Completed overs for respective innings
  };

  const isFirstInningsComplete = () =>
    matchHistory[0]?.overs && matchHistory[0].overs.length > 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overs History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Innings History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">First Innings</h3>
          {getInningsOvers(0).length > 0 ? (
            <div className="space-y-4">
              {getInningsOvers(0).map((over, overIndex) => (
                <div key={overIndex} className="p-4 border border-gray-300 rounded-lg">
                  <span className="text-sm font-medium text-gray-600 mb-2 inline-block">
                    Over {overIndex + 1}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {over.balls.map((ball, ballIndex) => (
                      <BallDisplay key={ballIndex} value={ball} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No overs played yet in the first innings.</p>
          )}
        </div>

        {/* Second Innings History */}
        {isFirstInningsComplete() && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Second Innings</h3>
            {getInningsOvers(1).length > 0 ? (
              <div className="space-y-4">
                {getInningsOvers(1).map((over, overIndex) => (
                  <div key={overIndex} className="p-4 border border-gray-300 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 mb-2 inline-block">
                      Over {overIndex + 1}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {over.balls.map((ball, ballIndex) => (
                        <BallDisplay key={ballIndex} value={ball} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No overs played yet in the second innings.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BallDisplay: React.FC<{ value: string | number }> = ({ value }) => (
  <div
    className={`
      w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
      ${
        value === 'W'
          ? 'bg-red-500 text-white'
          : value === 4 || value === 6
          ? 'bg-green-500 text-white'
          : 'bg-gray-100 text-gray-800'
      }
      border ${value === 'W' ? 'border-red-700' : 'border-gray-300'}
    `}
  >
    {value}
  </div>
);
