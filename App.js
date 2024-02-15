import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [gameActive, setGameActive] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""]);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleCellClick = (index) => {
    if (!gameActive || gameState[index] !== "")
      return;

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    handleResultValidation(newGameState);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const handleResultValidation = (state) => {
    for (let i = 0; i <= 7; i++) {
      const [a, b, c] = winningConditions[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        setGameActive(false);
        return;
      }
    }

    if (!state.includes("")) {
      setGameActive(false);
    }
  }

  const handleRestartGame = () => {
    setGameActive(true);
    setCurrentPlayer("X");
    setGameState(["", "", "", "", "", "", "", "", ""]);
  }

  const renderCell = (index) => {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => handleCellClick(index)}
      >
        <Text style={styles.cellText}>{gameState[index]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIC-TAC-TOE</Text>
      <View style={styles.gameContainer}>
        {gameState.map((value, index) => (
          <View key={index}>{renderCell(index)}</View>
        ))}
      </View>
      <Text style={styles.status}>{gameActive ? `${currentPlayer}'s turn` : (gameState.includes("") ? "Game in progress" : "Game ended")}</Text>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={handleRestartGame}
      >
        <Text style={styles.restartButtonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
  },
  gameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 306,
    marginBottom: 20,
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 60,
    fontFamily: 'Arial',
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
  },
});
