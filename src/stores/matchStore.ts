import { create } from 'zustand';

interface MatchState {
  score: number;
  wickets: number;
  currentOver: number; // Number of completed overs
  currentBall: number; // Ball count within the current over
  currentOverBalls: (number | 'W')[];
  overs: { balls: (number | 'W')[] }[];
  matchHistory: { match: number; innings: number; overs: { balls: (number | 'W')[] }[] }[];
  currentMatch: number;
  currentInnings: number;
  addRuns: (runs: number) => void;
  addWicket: () => void;
  startNewInnings: () => void;
  startNewMatch: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  score: 0,
  wickets: 0,
  currentOver: 0, // Completed overs
  currentBall: 1, // Ball count starts at 1 for each over
  currentOverBalls: [],
  overs: [],
  matchHistory: [],
  currentMatch: 1,
  currentInnings: 1,

  addRuns: (runs) =>
    set((state) => {
      if (state.currentOver === 10 || state.wickets === 10) return state; // End innings if 10 overs or 10 wickets

      const newBallCount = state.currentBall + 1;
      const isOverComplete = newBallCount > 6;

      return {
        ...state,
        score: state.score + runs,
        currentBall: isOverComplete ? 1 : newBallCount,
        currentOver: isOverComplete ? state.currentOver + 1 : state.currentOver,
        currentOverBalls: isOverComplete ? [] : [...state.currentOverBalls, runs],
        overs: isOverComplete
          ? [...state.overs, { balls: [...state.currentOverBalls, runs] }]
          : state.overs,
      };
    }),

  addWicket: () =>
    set((state) => {
      if (state.currentOver === 10 || state.wickets === 10) return state; // End innings if 10 overs or 10 wickets

      const newBallCount = state.currentBall + 1;
      const isOverComplete = newBallCount > 6;

      return {
        ...state,
        wickets: state.wickets + 1,
        currentBall: isOverComplete ? 1 : newBallCount,
        currentOver: isOverComplete ? state.currentOver + 1 : state.currentOver,
        currentOverBalls: isOverComplete ? [] : [...state.currentOverBalls, 'W'],
        overs: isOverComplete
          ? [...state.overs, { balls: [...state.currentOverBalls, 'W'] }]
          : state.overs,
      };
    }),

  startNewInnings: () =>
    set((state) => {
      if (state.currentInnings === 1 && (state.currentOver === 10 || state.wickets === 10)) {
        return {
          matchHistory: [
            ...state.matchHistory,
            {
              match: state.currentMatch,
              innings: state.currentInnings,
              overs: state.overs,
            },
          ],
          score: 0,
          wickets: 0,
          currentOver: 0,
          currentBall: 1,
          currentOverBalls: [],
          overs: [],
          currentInnings: 2,
        };
      }
      return state;
    }),

  startNewMatch: () =>
    set((state) => ({
      matchHistory: [
        ...state.matchHistory,
        {
          match: state.currentMatch,
          innings: state.currentInnings,
          overs: state.overs,
        },
      ],
      score: 0,
      wickets: 0,
      currentOver: 0,
      currentBall: 1,
      currentOverBalls: [],
      overs: [],
      currentMatch: state.currentMatch + 1,
      currentInnings: 1,
    })),
}));
