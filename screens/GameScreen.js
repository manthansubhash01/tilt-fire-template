import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Accelerometer } from "expo-sensors";
import {
  LANES,
  CAR_WIDTH,
  CAR_HEIGHT,
  CAR_Y_POSITION,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  OBSTACLE_SPAWN_Y,
  OBSTACLE_SPEED,
  OBSTACLE_SPAWN_INTERVAL,
  SCORE_INCREMENT_INTERVAL,
  TILT_THRESHOLD_LEFT,
  TILT_THRESHOLD_RIGHT,
  COLLISION_MARGIN,
  COLORS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  LANE_WIDTH,
} from "../constants/gameConfig";

export default function GameScreen({ onGameOver }) {
  const [carX, setCarX] = useState(LANES.CENTER);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);

  const gameLoopRef = useRef(null);
  const obstacleSpawnRef = useRef(null);
  const scoreIntervalRef = useRef(null);
  const accelerometerSubscription = useRef(null);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    accelerometerSubscription.current = Accelerometer.addListener(
      (accelerometerData) => {
        if (!isGameActive) return;

        const { x } = accelerometerData;

        let newLane;
        if (x < TILT_THRESHOLD_LEFT) {
          newLane = LANES.RIGHT;
        } else if (x > TILT_THRESHOLD_RIGHT) {
          newLane = LANES.LEFT;
        } else {
          newLane = LANES.CENTER;
        }

        setCarX(newLane);
      }
    );

    return () => {
      if (accelerometerSubscription.current) {
        accelerometerSubscription.current.remove();
      }
    };
  }, [isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;

    obstacleSpawnRef.current = setInterval(() => {
      spawnObstacle();
    }, OBSTACLE_SPAWN_INTERVAL);

    return () => {
      if (obstacleSpawnRef.current) {
        clearInterval(obstacleSpawnRef.current);
      }
    };
  }, [isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;

    scoreIntervalRef.current = setInterval(() => {
      setScore((prev) => prev + 1);
    }, SCORE_INCREMENT_INTERVAL);

    return () => {
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
      }
    };
  }, [isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;

    const gameLoop = () => {
      setObstacles((prevObstacles) => {
        const updatedObstacles = prevObstacles.map((obstacle) => ({
          ...obstacle,
          y: obstacle.y + OBSTACLE_SPEED,
        }));

        return updatedObstacles.filter(
          (obstacle) => obstacle.y < SCREEN_HEIGHT + OBSTACLE_HEIGHT
        );
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;

    for (let obstacle of obstacles) {
      if (checkCollision(carX, CAR_Y_POSITION, obstacle.x, obstacle.y)) {
        endGame();
        break;
      }
    }
  }, [obstacles, carX, isGameActive]);

  const spawnObstacle = () => {
    const laneKeys = Object.keys(LANES);
    const randomLaneKey = laneKeys[Math.floor(Math.random() * laneKeys.length)];
    const randomLaneX = LANES[randomLaneKey];

    const newObstacle = {
      id: Date.now() + Math.random(),
      x: randomLaneX,
      y: OBSTACLE_SPAWN_Y,
    };

    setObstacles((prev) => [...prev, newObstacle]);
  };

  const checkCollision = (carX, carY, obstacleX, obstacleY) => {
    const carLeft = carX - CAR_WIDTH / 2 + COLLISION_MARGIN;
    const carRight = carX + CAR_WIDTH / 2 - COLLISION_MARGIN;
    const carTop = carY - CAR_HEIGHT / 2 + COLLISION_MARGIN;
    const carBottom = carY + CAR_HEIGHT / 2 - COLLISION_MARGIN;

    const obstacleLeft = obstacleX - OBSTACLE_WIDTH / 2;
    const obstacleRight = obstacleX + OBSTACLE_WIDTH / 2;
    const obstacleTop = obstacleY - OBSTACLE_HEIGHT / 2;
    const obstacleBottom = obstacleY + OBSTACLE_HEIGHT / 2;

    const collision =
      carRight > obstacleLeft &&
      carLeft < obstacleRight &&
      carBottom > obstacleTop &&
      carTop < obstacleBottom;

    return collision;
  };

  const endGame = () => {
    setIsGameActive(false);

    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    if (obstacleSpawnRef.current) {
      clearInterval(obstacleSpawnRef.current);
    }
    if (scoreIntervalRef.current) {
      clearInterval(scoreIntervalRef.current);
    }
    if (accelerometerSubscription.current) {
      accelerometerSubscription.current.remove();
    }

    setTimeout(() => {
      onGameOver(score);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameArea}>
        <View style={[styles.laneMarker, { left: LANE_WIDTH }]} />
        <View style={[styles.laneMarker, { left: LANE_WIDTH * 2 }]} />

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        <Image
          source={require("../assets/car2.webp")}
          style={[
            styles.car,
            {
              left: carX - CAR_WIDTH / 2,
              top: CAR_Y_POSITION - CAR_HEIGHT / 2,
            },
          ]}
        />

        {obstacles.map((obstacle) => (
          <Image
            key={obstacle.id}
            source={require("../assets/obstacle4.png")}
            style={[
              styles.obstacle,
              {
                left: obstacle.x - OBSTACLE_WIDTH / 2,
                top: obstacle.y - OBSTACLE_HEIGHT / 2,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameArea: {
    flex: 1,
    position: "relative",
  },
  laneMarker: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: COLORS.lane,
  },
  scoreContainer: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 10,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.score,
  },
  car: {
    position: "absolute",
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    resizeMode: "contain",
  },
  obstacle: {
    position: "absolute",
    width: OBSTACLE_WIDTH,
    height: OBSTACLE_HEIGHT,
    resizeMode: "contain",
  },
});
