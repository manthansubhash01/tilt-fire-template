import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [gameState, setGameState] = useState("start");
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    setGameState("playing");
    setFinalScore(0);
  };

  const handleGameOver = (score) => {
    setFinalScore(score);
    setGameState("gameOver");
  };

  const handleRestart = () => {
    setGameState("playing");
    setFinalScore(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {gameState === "start" && <StartScreen onStartGame={handleStartGame} />}

      {gameState === "playing" && <GameScreen onGameOver={handleGameOver} />}

      {gameState === "gameOver" && (
        <GameOverScreen score={finalScore} onRestart={handleRestart} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
