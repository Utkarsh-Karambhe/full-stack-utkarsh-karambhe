import React from 'react';
import { useMatchStore } from '../stores/matchStore';

const BallDisplay: React.FC<{ value: string | number; isActive?: boolean }> = ({
  value,
  isActive = false,
}) => (
  <div
    className={`
      w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
      ${
        value === 'W'
          ? 'bg-red-500 text-white'
          : value === 4 || value === 6
          ? 'bg-green-500 text-white'
          : 'bg-gray-200'
      }
      ${isActive ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
    `}
  >
    {value}
  </div>
);

export const CurrentOver: React.FC = () => {
  const { currentOver, currentBall, currentOverBalls } = useMatchStore();

  // Format current over as "1.1", "1.2", etc.
  const formattedOver = `${currentOver}.${currentBall - 1}`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">This Over</h2>
      <p className="mb-2 text-gray-700">Current Over: {formattedOver}</p>
      <div className="flex justify-around">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <BallDisplay
              key={index}
              value={currentOverBalls[index] || ''}
              isActive={index === currentBall - 1}
            />
          ))}
      </div>
    </div>
  );
};
