import React from 'react';
import { useMatchStore } from '../stores/matchStore';

export const ScoreHeader: React.FC = () => {
  const {
    score,
    wickets,
    currentOver,
    currentInnings,
    matchHistory,
    currentBall,  // get current ball number from state
  } = useMatchStore();

  const firstInningsTotal =
    currentInnings === 2 && matchHistory.length > 0
      ? matchHistory[matchHistory.length - 1].overs
          .flatMap((over) => over.balls)
          .filter((ball) => ball !== 'W')
          .reduce((sum, runs) => sum + (typeof runs === 'number' ? runs : 0), 0)
      : 0;

  const targetRuns = firstInningsTotal + 1;
  const remainingBalls = (10 - currentOver) * 6 - currentBall;

  // Function to calculate the current over and ball dynamically
  const calculateCurrentOverBall = () => {
    if (currentBall === 0) {
      return '0.0'; // When no balls are bowled yet, return '0.0'
    }

    let totalBallsPlayed = currentOver * 6 + currentBall;  // Total number of balls played across overs
    let over = Math.floor(totalBallsPlayed / 6);  // Full overs
    let ball = totalBallsPlayed % 6;  // Remainder balls

    // This should correctly handle when the first ball is bowled, i.e., '0.1', '0.2', etc.
    return `${over}.${ball === 0 ? 6 : ball}`; // If ball is 0, show '6' instead of '0'
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg text-center">
      <div className="text-xl font-semibold mb-2">
        Innings {currentInnings}
      </div>
      <div className="text-6xl font-bold mb-4">
        {score}/{wickets}
      </div>
      <div className="text-2xl">
        {calculateCurrentOverBall()} {/* Display dynamic over.ball */}
      </div>
      {currentInnings === 2 && (
        <div className="mt-4 text-lg font-medium bg-gray-800 p-3 rounded-lg">
          {targetRuns - score > 0
            ? `${targetRuns - score} runs needed in ${remainingBalls} balls`
            : 'Target Achieved!'}
        </div>
      )}
    </div>
  );
};
