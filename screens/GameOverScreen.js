import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/gameConfig";

export default function GameOverScreen({ score, onRestart }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>GAME OVER</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>FINAL SCORE</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>PLAY AGAIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  gameOverText: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.obstacle,
    letterSpacing: 4,
    marginBottom: 60,
    textAlign : 'center'
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  scoreLabel: {
    fontSize: 20,
    color: COLORS.text,
    letterSpacing: 2,
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: "bold",
    color: COLORS.score,
  },
  button: {
    backgroundColor: COLORS.car,
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 5,
    shadowColor: COLORS.car,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.background,
    letterSpacing: 2,
  },
});
