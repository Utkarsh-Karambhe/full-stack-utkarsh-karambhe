import React from 'react';
import { ScoreHeader } from './components/ScoreHeader';
import { ControlPanel } from './components/ControlPanel';
import { CurrentOver } from './components/CurrentOver';
import { OversHistory } from './components/OversHistory';
import MatchComponent from './components/MatchComponent';

function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <ScoreHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <CurrentOver />
          <ControlPanel />
          <OversHistory />
          <MatchComponent />
        </div>
      </div>
    </main>
  );
}

export default App;
