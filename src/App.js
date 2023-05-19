import React, { useEffect, useState, useCallback } from 'react';
import ScoreBoard from './components/ScoreBoard';
import blueCandy from './images/blue-candy.png';
import greenCandy from './images/green-candy.png';

const App = () => {
  const width = 8;
  const candyColors = [blueCandy, greenCandy];

  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (columnOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
    return false;
  }, [currentColorArrangement]);

  const checkForRowOfFour = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (rowOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
    return false;
  }, [currentColorArrangement]);

  const checkForColumnOfThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (columnOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
    return false;
  }, [currentColorArrangement]);

  const checkForRowOfThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (rowOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
    return false;
  }, [currentColorArrangement]);

  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      const isBlank = currentColorArrangement[i] === blank;

      if (isBlank && !isFirstRow) {
        let j = i;
        while (j >= width) {
          currentColorArrangement[j] = currentColorArrangement[j - width];
          j -= width;
        }
        currentColorArrangement[j] = getRandomColor();
      }
    }
  }, [currentColorArrangement]);

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    if (squareBeingReplacedId && validMove) {
      currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
      currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement]);
    } else {
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        checkForColumnOfFour() ||
        checkForRowOfFour() ||
        checkForColumnOfThree() ||
        checkForRowOfThree()
      ) {
        setScoreDisplay((score) => score + 1);
      }
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <ScoreBoard score={scoreDisplay} />
      <div className="candy-board">
        {currentColorArrangement.map((color, index) => (
          <img
            key={index}
            src={color}
            alt={color}
            data-id={index}
            draggable="true"
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
