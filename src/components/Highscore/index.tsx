import React, { useState } from "react";

interface HighscoreProps {
  updateNewHighscore: (name: string, moves: number) => void;
  highscorePopup: boolean;
  numberOfMoves: number;
}

const Highscore: React.FC<HighscoreProps> = ({
  updateNewHighscore,
  highscorePopup,
  numberOfMoves,
}) => {
  const [userName, setUserName] = useState<string>("");

  function handleHighscoreSubmit() {
    if (userName.trim() !== "") {
      updateNewHighscore(userName, numberOfMoves);
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        highscorePopup ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      data-testid="highscore-popup"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">New Highscore!</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          data-testid="input"
          className="border border-gray-300 p-2 mt-2 w-full"
        />
        <button
          onClick={handleHighscoreSubmit}
          data-testid="highscore-button"
          className="bg-green-500 text-white font-bold py-2 px-4 mt-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Highscore;
