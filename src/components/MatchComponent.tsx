import { useMatchStore } from '../stores/matchStore';

const MatchComponent = () => {
  const { score, wickets, addRuns, addWicket, startNewInnings, startNewMatch } = useMatchStore();

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.title}>Score: {score}</h1>
        <h2 style={styles.subtitle}>Wickets: {wickets}</h2>
      </div>
      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={() => addRuns(1)}>Add 1 Run</button>
        <button style={styles.button} onClick={addWicket}>Add Wicket</button>
        <button style={styles.button} onClick={startNewInnings}>Start New Innings</button>
        <button style={styles.button} onClick={startNewMatch}>Start New Match</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align top of the page
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    minHeight: '500px',
    color: '#333', // Darker text color for readability
    paddingTop: '30px', // Added padding for top spacing
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center', // Align the title and subtitle side by side
    marginBottom: '20px', // Space between text and buttons
  },
  title: {
    fontSize: '24px',
    color: '#333', // Set the same color for both
    marginRight: '15px', // Space between title and subtitle
    fontWeight: '500',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    fontSize: '24px',
    color: '#333', // Same color as title
    fontWeight: '500',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row', // Align buttons in a row
    gap: '15px', // Space between buttons
    justifyContent: 'center', // Center the buttons
    marginTop: '20px', // Add a small gap between buttons and the text
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '180px',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  buttonActive: {
    transform: 'scale(0.98)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
  buttonFocus: {
    outline: 'none',
    boxShadow: '0 0 5px 2px rgba(72, 200, 128, 0.6)',
  },
};

export default MatchComponent;
