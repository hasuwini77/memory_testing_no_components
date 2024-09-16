"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [turnedStates, setTurnedStates] = useState<(number | null)[]>(
    Array(12).fill(null)
  );
  const [flippedCardIndexes, setFlippedCardIndexes] = useState<number[]>([]);
  const [initialImages, setInitialImages] = useState<string[]>([]);
  const [numberOfMoves, setNumberOfMoves] = useState<number>(0);
  const [newHighScore, setNewHighScore] = useState<number | null>(null);
  const [highscorePopup, setHighscorePopup] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [highscoreName, setHighscoreName] = useState<string>("");
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Load highscore and username from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("highscore");
    const savedName = localStorage.getItem("name");

    if (savedHighScore) {
      setNewHighScore(parseInt(savedHighScore, 10));
    }
    if (savedName) {
      setHighscoreName(savedName);
    }
  }, []);

  // Generate and set initial images
  useEffect(() => {
    function getRandomizedImages() {
      const images = [
        "/cabin.svg",
        "/car.svg",
        "/cow.svg",
        "/flower.svg",
        "/guitar.svg",
        "/pineapple.svg",
      ];
      const doubledImages = [...images, ...images];
      for (let i = doubledImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [doubledImages[i], doubledImages[j]] = [
          doubledImages[j],
          doubledImages[i],
        ];
      }
      return doubledImages;
    }

    setInitialImages(getRandomizedImages());
  }, []);

  // Check for card matches and handle card flipping logic
  useEffect(() => {
    if (flippedCardIndexes.length === 2) {
      const [firstIndex, secondIndex] = flippedCardIndexes;

      if (initialImages[firstIndex] !== initialImages[secondIndex]) {
        // No match, flip back after a delay
        setTimeout(() => {
          setTurnedStates((prevState) => {
            const newState = [...prevState];
            newState[firstIndex] = null;
            newState[secondIndex] = null;
            return newState;
          });
          setFlippedCardIndexes([]);
        }, 1100);
      } else {
        // Match, reset flipped card indexes
        setFlippedCardIndexes([]);
      }
    }
  }, [flippedCardIndexes, initialImages]);

  // Check if all cards are revealed and set gameCompleted state
  useEffect(() => {
    const allCardsRevealed = turnedStates.every((state) => state !== null);

    if (allCardsRevealed) {
      setGameCompleted(true);
    }
  }, [turnedStates]);

  // Determine if a new high score has been achieved and set highscorePopup state
  useEffect(() => {
    if (gameCompleted) {
      const isNewHighscore =
        newHighScore === null || numberOfMoves < newHighScore;

      if (isNewHighscore) {
        setHighscorePopup(true);
      } else {
        setHighscorePopup(false);
      }
    } else {
      setHighscorePopup(false);
    }
  }, [gameCompleted, numberOfMoves, newHighScore]);

  function handleClick(index: number) {
    if (flippedCardIndexes.length < 2 && turnedStates[index] === null) {
      setNumberOfMoves((prevMoves) => prevMoves + 1);
      setTurnedStates((prevState) => {
        const newState = [...prevState];
        newState[index] = index;
        return newState;
      });
      setFlippedCardIndexes((prevIndexes) => [...prevIndexes, index]);
    }
  }

  function resetGame() {
    setFlippedCardIndexes([]);
    setTurnedStates(Array(12).fill(null));
    setNumberOfMoves(0);
    setGameCompleted(false);
    setHighscorePopup(false);
  }

  function handleHighscoreSubmit() {
    if (userName.trim() !== "") {
      localStorage.setItem("name", userName);
      localStorage.setItem("highscore", numberOfMoves.toString());
      setHighscoreName(userName);
      setNewHighScore(numberOfMoves);
      setHighscorePopup(false);
    }
  }

  return (
    <main className="">
      <BackgroundLines>
        <Header />
        <div className="grid grid-cols-4 gap-4 p-5 max-w-xl mx-auto">
          {initialImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              data-testid="card"
              className="bg-gray-100 border-2 border-gray-300 rounded-lg h-28 flex items-center justify-center text-4xl font-bold cursor-pointer transform transition-transform duration-300 hover:bg-gray-200 hover:-translate-y-1"
            >
              {turnedStates[index] !== null ? (
                <Image
                  src={image}
                  alt={`card-${index}`}
                  width={100}
                  height={100}
                  data-testid="card-image"
                  className="w-full h-full object-contain"
                />
              ) : (
                "?"
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center p-6">
          <button
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
            data-testid="new-game-btn"
            onClick={resetGame}
          >
            New Game
          </button>
          <div className="flex flex-col items-center justify-center">
            <span className="text-white p-2" data-testid="moves">
              Number of Moves: {numberOfMoves}
            </span>
            <span className="text-white p-2" data-testid="highscore">
              {highscoreName ? `${highscoreName}: ` : ""}Highscore:{" "}
              {newHighScore !== null ? newHighScore : "N/A"}
            </span>
          </div>
        </div>

        {highscorePopup && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
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
        )}
        <Footer />
      </BackgroundLines>
    </main>
  );
}
