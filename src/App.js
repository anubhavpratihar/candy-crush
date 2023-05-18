import { useEffect, useState, useCallback } from 'react';
import React, { useEffect, useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import blueCandy from './images/blue-candy.png';
import greenCandy from './images/green-candy.png';
@@ -24,93 +24,73 @@ const App = () => {
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = useCallback(() => {
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
      if (columnOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  }, [currentColorArrangement]);
    return false;
  };

  const checkForRowOfFour = useCallback(() => {
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64,
      ];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
      if (rowOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  }, [currentColorArrangement]);
    return false;
  };

  const checkForColumnOfThree = useCallback(() => {
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
      if (columnOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  }, [currentColorArrangement]);
    return false;
  };

  const checkForRowOfThree = useCallback(() => {
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
      if (rowOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  }, [currentColorArrangement]);
    return false;
  };

  const moveIntoSquareBelow = useCallback(() => {
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
@@ -125,7 +105,7 @@ const App = () => {
        currentColorArrangement[i] = blank;
      }
    }
  }, [currentColorArrangement]);
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
@@ -135,21 +115,12 @@ const App = () => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = useCallback(() => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute('data-id')
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute('data-id')
    );

    const updatedColorArrangement = [...currentColorArrangement];
    updatedColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute(
      'src'
    );
    updatedColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute(
      'src'
    );
  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId - 1,
@@ -173,26 +144,18 @@ const App = () => {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      setCurrentColorArrangement(updatedColorArrangement);
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  }, [
    squareBeingDragged,
    squareBeingReplaced,
    currentColorArrangement,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
  ]);
  };

  const createBoard = () => {
    const randomColorArrangement = candyColors.map((color) => {
      const randomColor = Math.floor(Math.random() * color.length);
      return color[randomColor];
    });

    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

@@ -202,33 +165,30 @@ const App = () => {

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
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    moveIntoSquareBelow,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
  ]);
  }, []);

  return (
    <div>
      <ScoreBoard score={scoreDisplay} />
      <div className="candy-board">
        {currentColorArrangement.map((color, index) => (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={color}
            alt={color}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable="true"
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
@@ -238,6 +198,7 @@ const App = () => {
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};
