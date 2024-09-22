import React from "react";

const Rules: React.FC = () => {
  return (
    <div className="bg-purple-500 p-6 rounded-lg max-w-[50rem] mx-auto shadow-lg mb-6">
      <h4 className="text-2xl font-bold mb-4 text-center">Rules</h4>
      <p data-testid="rules-text" className="text-md mb-2">
        Click a card to reveal an image. Then click another card to reveal that
        image. Your job is to remember the images and click two of the same
        cards. Good luck beating the highscore!
      </p>
      <p data-testid="good-luck" className="text-xl font-semibold text-center">
        Good Luck!
      </p>
    </div>
  );
};

export default Rules;
