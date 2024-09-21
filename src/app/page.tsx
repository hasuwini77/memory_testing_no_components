"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useState, useEffect } from "react";
import Image from "next/image";
import Highscore from "@/components/Highscore";
import NewGameButton from "@/components/NewGameBtn";
import Rules from "@/components/Rules";

export default function Home() {
  const [turnedStates, setTurnedStates] = useState<(number | null)[]>(
    Array(12).fill(null)
  );
  const [flippedCardIndexes, setFlippedCardIndexes] = useState<number[]>([]);
  const [initialImages, setInitialImages] = useState<string[]>([]);
  const [numberOfMoves, setNumberOfMoves] = useState<number>(0);
  const [newHighScore, setNewHighScore] = useState<number | null>(null);
  const [highscorePopup, setHighscorePopup] = useState<boolean>(false);
  const [highscoreName, setHighscoreName] = useState<string>("");
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Load highscore from localStorage
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

  // Check if all cards are revealed
  useEffect(() => {
    const allCardsRevealed = turnedStates.every((state) => state !== null);

    if (allCardsRevealed) {
      setGameCompleted(true);
    }
  }, [turnedStates]);

  // Determine if a new high score has been achieved
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

  function updateNewHighscore(name: string, moves: number) {
    localStorage.setItem("name", name);
    localStorage.setItem("highscore", moves.toString());
    setHighscoreName(name);
    setNewHighScore(moves);
    setHighscorePopup(false);
  }

  return (
    <main>
      <BackgroundLines>
        <Header />

        {/* Add Rules component here */}
        <Rules />

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

        <div className="flex flex-col items-center p-6 space-y-6">
          <NewGameButton newRound={resetGame} />

          <div className="flex flex-col items-center justify-center border-4 border-purple-500 rounded-lg shadow-lg bg-gradient-to-br from-purple-800 via-purple-600 to-purple-400 text-white max-w-md p-4">
            <span className="text-white p-2 text-lg" data-testid="moves">
              Number of Moves: {numberOfMoves}
            </span>
            <span className="text-white p-2 text-lg" data-testid="highscore">
              {highscoreName ? `${highscoreName}: ` : ""}Highscore:{" "}
              {newHighScore !== null ? newHighScore : "N/A"}
            </span>
          </div>
        </div>

        <Highscore
          updateNewHighscore={updateNewHighscore}
          highscorePopup={highscorePopup}
          numberOfMoves={numberOfMoves}
        />

        <Footer />
      </BackgroundLines>
    </main>
  );
}
