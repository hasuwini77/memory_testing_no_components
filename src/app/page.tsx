"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [turnedStates, setTurnedStates] = useState<(number | null)[]>(
    Array(12).fill(null)
  );
  const [flippedCardIndexes, setFlippedCardIndexes] = useState<number[]>([]);
  const [initialImages, setInitialImages] = useState<string[]>([]);

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
  }, [flippedCardIndexes]);

  function handleClick(index: number) {
    if (flippedCardIndexes.length < 2 && turnedStates[index] === null) {
      setTurnedStates((prevState) => {
        const newState = [...prevState];
        newState[index] = index;
        return newState;
      });
      setFlippedCardIndexes((prevIndexes) => [...prevIndexes, index]);
    }
  }

  return (
    <main>
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
    </main>
  );
}
