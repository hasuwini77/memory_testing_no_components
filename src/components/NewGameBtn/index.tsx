import React from "react";

interface NewGameButtonProps {
  newRound: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ newRound }) => {
  return (
    <button
      className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
      data-testid="new-game-btn"
      onClick={newRound}
    >
      New Game
    </button>
  );
};

export default NewGameButton;
