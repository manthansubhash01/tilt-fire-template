import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/gameConfig";

export default function StartScreen({ onStartGame }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ZIG-ZAG</Text>
        <Text style={styles.subtitle}>RACER</Text>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionText}>Tilt your device to move</Text>
        <Text style={styles.instructionText}>Stay in lanes</Text>
        <Text style={styles.instructionText}>Avoid obstacles</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onStartGame}>
        <Text style={styles.buttonText}>START GAME</Text>
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
  titleContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: COLORS.car,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.obstacle,
    letterSpacing: 8,
    marginTop: -10,
  },
  instructionsContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 18,
    color: COLORS.text,
    marginVertical: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.car,
    paddingHorizontal: 60,
    paddingVertical: 20,
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
